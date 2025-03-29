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
    const todoInput = await request.json() as Todo;
    const todoValidation = validateTodo(todoInput, context);
    if (!todoValidation.isValid) {
        return todoValidation.response!;
    }

    // Todo speichern
    const id = await service.addTodoForOwner(todoInput, owner);
    context.log(`ID of new todo is "${id}"`);

    const savedTodo: Todo = {
        id,
        text: todoInput.text
    };

    return {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(savedTodo)
    };
}

app.http('AddTodo', {
    methods: ['POST'],
    route: 'todos',
    authLevel: 'anonymous',
    handler: AddTodo,
});