import {TableClient, AzureNamedKeyCredential, TableEntity} from "@azure/data-tables";
import { Todo } from "../entities/Todo";
import {ResourceNotFoundError} from "../utils/ResourceNotFoundError";

export class TodoRepository {
    private tableClient: TableClient;

    constructor() {
        // Konfigurationswerte laden und validieren
        const {
            accountName,
            accountKey,
            tableName,
            isLocal,
            allowInsecureConnection
        } = this.getConfig();

        // Azure Credentials erstellen
        const credential = new AzureNamedKeyCredential(accountName, accountKey);

        // Tabellenendpunkt dynamisch einstellen (lokal oder Cloud)
        const tableEndpoint = isLocal
            ? `http://127.0.0.1:10002/${accountName}` // Lokaler Emulator
            : `https://${accountName}.table.core.windows.net`; // Produktive Azure URL

        // Table Client mit Konfiguration erstellen
        this.tableClient = new TableClient(tableEndpoint, tableName, credential, {
            allowInsecureConnection // Lokale Umgebung: Unsichere Verbindungen zulassen
        });

        // Versuchen, die Tabelle zu erstellen (nur beim ersten Start oder lokal)
        this.createTableIfNotExists(tableName);
    }

    /**
     * Aufgaben-/Datenbankkonfigurationen aus Umgebungsvariablen laden
     */
    private getConfig() {
        const accountName = process.env.AZURE_ACCOUNT_NAME!;
        const accountKey = process.env.AZURE_ACCOUNT_KEY!;
        const tableName = process.env.AZURE_TABLE_NAME!;
        const isLocal = process.env.AZURE_ENV === "local"; // z. B. Entwicklungsumgebung
        const allowInsecureConnection = isLocal; // Lokale Entwicklungsumgebung erlaubt HTTP

        // Validierung - sicherstellen, dass alle Werte verfügbar sind
        if (!accountName || !accountKey || !tableName) {
            throw new Error("Environment variables for Azure Storage are missing!");
        }

        return { accountName, accountKey, tableName, isLocal, allowInsecureConnection };
    }

    /**
     * Tabelle nur erstellen, wenn sie nicht existiert
     */
    private async createTableIfNotExists(tableName: string) {
        try {
            await this.tableClient.createTable();
            console.log(`Table "${tableName}" created successfully.`);
        } catch (error: any) {
            if (error.statusCode === 409) {
                console.log(`Table "${tableName}" already exists.`);
            } else {
                console.error("Failed to create the table:", error.message);
                throw error; // Fehler weiterwerfen für Debugging
            }
        }
    }

    /**
     * Fügt einen Task zum Table Storage hinzu.
     *
     * @param task - Die hinzuzufügende Task.
     * @param owner - Der Besitzer der Task.
     * @returns Die ID der hinzugefügten Task.
     * @throws Error, falls die Validierung fehlschlägt oder ein anderer Fehler auftritt.
     */
    async addTask(task: Todo, owner: string): Promise<string> {
        this.validateTaskInput(task, owner);

        const persistentTask = this.toEntity(task, owner);

        try {
            await this.tableClient.createEntity(persistentTask);
            console.log(`Task successfully added: ${task.id}`);
            return task.id;
        } catch (error: any) {
            const errorMsg = `Failed to add task (${task?.id}): ${error.message}`;
            console.error(errorMsg);
            throw new Error(errorMsg);
        }
    }

    /**
     * Validiert die Eingaben für einen Task.
     *
     * @param task - Die zu überprüfende Task.
     * @param owner - Der Besitzer der Task.
     * @throws Error bei fehlendem Task oder Owner.
     */
    private validateTaskInput(task: Todo, owner: string): void {
        if (!task || !owner) {
            throw new Error("Invalid task or owner. Ensure both parameters are provided.");
        }
    }

    /**
     * Bestehende Aufgabe aktualisieren (Merge bei Updates)
     */
    async updateTask(task: Todo, owner: string): Promise<void> {
        const persistentTask = this.toEntity(task, owner);

        await this.tableClient.upsertEntity(persistentTask, "Merge");
    }

    /**
     * Eine Aufgabe anhand von Owner und ID abrufen
     */
    async getTaskByOwnerAndId(owner: string, id: string): Promise<Todo | null> {
        try {
            const entity = await this.tableClient.getEntity<Record<string, any>>(owner, id);

            return this.fromEntity(entity);
        } catch (error: any) {
            if (error.statusCode === 404) {
                return null; // Aufgabe existiert nicht
            }
            throw error;
        }
    }

    /**
     * Alle Aufgaben eines Owners abrufen
     */
    async getTodosForOwner(owner: string): Promise<Todo[]> {
        const todos: Todo[] = [];
        const filterCondition = `PartitionKey eq '${owner}'`;

        try {
            for await (const todoEntity of this.tableClient.listEntities<Record<string, any>>(
                this.getQueryOptionsForOwner(filterCondition)
            )) {
                todos.push(this.fromEntity(todoEntity));
            }
        } catch (error: any) {
            console.error("Failed to fetch todos:", error.message);
            throw error;
        }

        return todos;
    }

    private getQueryOptionsForOwner(filterCondition: string): { queryOptions: { filter: string } } {
        return { queryOptions: { filter: filterCondition } };
    }

    /**
     * Aufgabe löschen
     */
    async deleteTodoByOwnerAndId(owner: string, id: string): Promise<void> {
        try {
            await this.tableClient.deleteEntity(owner, id);
        } catch (error: any) {
            console.error(`Error details: ${JSON.stringify(error)}`);

            if (JSON.stringify(error).includes("ResourceNotFound")) {
                console.warn(`Task with ID (${id}) for owner (${owner}) does not exist.`);
                throw new ResourceNotFoundError(`Task (${id}) for owner (${owner}) not found.`);
            }

            console.error(`Failed to delete task (${id}) for owner (${owner}):`, error.message);
            throw error;
        }
    }

    /**
     * Hilfsmethoden: Task -> Entity und anders herum
     */
    private toEntity(task: Todo, owner: string): TableEntity<Record<string, any>> {
        return {
            partitionKey: owner,
            rowKey: task.id,
            owner,
            id: task.id,
            text: task.text
        };
    }

    private fromEntity(entity: Record<string, any>): Todo {
        return {
            id: entity.rowKey,
            text: entity.text
        };
    }
}
