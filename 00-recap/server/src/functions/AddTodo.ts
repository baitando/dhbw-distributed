import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { validateOwner, validateTodo } from "../utils/ValidationUtils.js";
import { TodoService } from "../services/TodoService";
import { Todo } from "../entities/Todo";

export async function AddTodo(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const service = new TodoService();

    // Owner validieren
    const ownerValidation = validateOwner(request, context);
    if (!ownerValidation.isValid) {
        return ownerValidation.response!;
    }
    const owner = ownerValidation.owner!;

    // Todo validieren
    const todo = await request.json() as Todo;
    const todoValidation = validateTodo(todo, context);
    if (!todoValidation.isValid) {
        return todoValidation.response!;
    }

    // Todo speichern
    const id = await service.addTodoForOwner(todo, owner);
    context.log(`ID of new todo is "${id}"`);

    return {
        status: 201
    };
}

app.http('AddTodo', {
    methods: ['POST'],
    route: 'todos',
    authLevel: 'anonymous',
    handler: AddTodo,
});