import {HttpRequest, HttpResponseInit} from "@azure/functions";

/**
 * Validiert den Header `x-api-key`.
 * Stellt sicher, dass der Wert ein nicht-leerer String ist.
 */
export function validateOwner(request: HttpRequest, context: any): {
    isValid: boolean;
    owner?: string;
    response?: HttpResponseInit
} {
    const owner = request.headers.get('x-api-key');
    if (!owner || typeof owner !== "string" || owner.trim() === "") {
        context.log("Validation failed: 'x-api-key' must be a non-empty string.");
        return {
            isValid: false,
            response: {
                status: 400, // Bad Request
                jsonBody: { error: "Header field 'x-api-key' (owner) must be a non-empty string." }
            }
        };
    }
    return { isValid: true, owner };
}

/**
 * Validiert ein `Todo`-Objekt.
 * Überprüft, ob das `text`-Feld vorhanden, ein String und nicht leer ist.
 */
export function validateTodo(todo: any, context: any): { isValid: boolean, response?: HttpResponseInit } {
    if (!todo || typeof todo.text !== "string" || todo.text.trim() === "") {
        context.log("Validation failed: 'text' field must be a non-empty string.");
        return {
            isValid: false,
            response: {
                status: 400, // Bad Request
                jsonBody: { error: "Todo field 'text' must be a non-empty string." }
            }
        };
    }
    return { isValid: true };
}