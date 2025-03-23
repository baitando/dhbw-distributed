import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { validateOwner } from "../utils/ValidationUtils";
import { TodoService } from "../services/TodoService";

export async function GetAllTodos(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const service = new TodoService();

    // Owner validieren
    const ownerValidation = validateOwner(request, context);
    if (!ownerValidation.isValid) {
        return ownerValidation.response!;
    }
    const owner = ownerValidation.owner!;

    // Todos abrufen
    const todoList = await service.getTodosForOwner(owner);
    context.log(`Found "${todoList.length}" entries for owner "${owner}".`);

    return {
        status: 200,
        jsonBody: todoList,
    };
}

app.http('GetAllTodos', {
    methods: ['GET'],
    route: 'todos',
    authLevel: 'anonymous',
    handler: GetAllTodos,
});