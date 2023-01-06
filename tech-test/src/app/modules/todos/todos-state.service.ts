import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ITask} from '../../models/Task';
import {TodoApiService} from '../../services/api/todo-api.service';
import {findObjectsByProp} from '../../shared/utils/helpers';

@Injectable({
    providedIn: 'root'
})
export class TodosStateService {
    private todosState: ITask[] = [];

    public todos$ = new BehaviorSubject<ITask[]>([]);
    public loading$ = new BehaviorSubject<boolean>(false);
    public selectedItem$ = new BehaviorSubject<ITask | null>(null);

    public set selectedTodo(value: ITask) {
        this.selectedItem$.next(value);
    }

    constructor(private todoApi: TodoApiService) {
    }

    public hasTodos(): boolean {
        return !!this.todosState.length;
    }

    public filterTodos(text: string): void {
        this.todos$.next(findObjectsByProp(this.todosState, 'label', text));
    }

    // no need for unsubscription since those observables are cold
    public getTodo(id: number): void {
        this.todoApi.getTaskById(id).subscribe((res) => this.selectedTodo = res);
    }

    public updateTodo(todo: ITask): void {
        this.todoApi.updateTaskById(todo.id, todo).subscribe((res) => {
            this.todosState = this.todosState.map((item) => res.id === item.id ? res : item);
            this.todos$.next(this.todosState);
        });
    }

    public createTodo(todo: Omit<ITask, 'id'>): void {
        this.todoApi.createTask(todo).subscribe((res) => {
            this.todosState.push(res);
            this.todos$.next(this.todosState);
        });
    }

    public deleteTodo(id: number): void {
        this.todoApi.deleteTaskById(id).subscribe(() => {
            this.todosState = this.todosState.filter((item) => id !== item.id);
            this.todos$.next(this.todosState);
        });
    }

    public getAllTasks(): void {
        this.loading$.next(true);
        this.todoApi.getTaskList().subscribe((tasks) => {
            this.todosState = tasks;
            this.todos$.next(tasks);
            this.loading$.next(false);
        });
    }

}
