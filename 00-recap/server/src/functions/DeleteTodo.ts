import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { validateOwner } from "../utils/ValidationUtils";
import { TodoService } from "../services/TodoService";
import { ResourceNotFoundError } from "../utils/ResourceNotFoundError";

export async function DeleteTodo(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const service = new TodoService();

    // Owner validieren
    const ownerValidation = validateOwner(request, context);
    if (!ownerValidation.isValid) {
        return ownerValidation.response!;
    }
    const owner = ownerValidation.owner!;

    // ID aus URL abrufen
    const id = request.params.id;
    if (!id) {
        context.log("Validation failed: 'id' parameter missing.");
        return {
            status: 400, // Bad Request
            jsonBody: { error: "Parameter 'id' is required." },
        };
    }

    // Löschen versuchen
    try {
        await service.deleteTodoByOwnerAndId(owner, id);
        context.log(`Todo with ID "${id}" for owner "${owner}" deleted.`);
        return {
            status: 200,
        };
    } catch (error: any) {
        if (error instanceof ResourceNotFoundError) {
            context.log(`Todo with ID "${id}" not found for owner "${owner}".`);
            return {
                status: 404, // Not Found
            };
        } else {
            context.log("Unexpected error during deletion:", error);
            return {
                status: 500, // Internal Server Error
                jsonBody: { error: "An unexpected error occurred." },
            };
        }
    }
}

app.http('DeleteTodo', {
    methods: ['DELETE'],
    route: 'todos/{id}',
    authLevel: 'anonymous',
    handler: DeleteTodo,
});