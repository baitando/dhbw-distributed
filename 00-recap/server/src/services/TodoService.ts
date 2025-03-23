import {v4 as uuidv4} from 'uuid';
import {TodoRepository} from "../repositories/TodoRepository";
import {Todo} from "../entities/Todo";

export class TodoService {

    private repository: TodoRepository;

    constructor() {
        this.repository = new TodoRepository();
    }


    registerApp(): any {
        return {
            apiKey: uuidv4()
        };
    }

    addTodoForOwner(todo: Todo, owner: string): Promise<string> {
        todo.id = uuidv4();
        return this.repository.addTask(todo, owner).then();
    }

    getTodosForOwner(owner: string): Promise<Todo[]> {
        return this.repository.getTodosForOwner(owner);
    }

    deleteTodoByOwnerAndId(owner: string, id: string): Promise<void> {
        return this.repository.deleteTodoByOwnerAndId(owner, id);
    }
}
