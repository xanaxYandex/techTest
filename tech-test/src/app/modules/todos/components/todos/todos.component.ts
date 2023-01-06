import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TodosStateService} from '../../todos-state.service';
import {ITask} from '../../../../models/Task';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {
    public searchText = '';
    public todos$: Observable<ITask[]> = this.todosState.todos$;
    public loading$: Observable<boolean> = this.todosState.loading$;

    constructor(private todosState: TodosStateService,
                private router: Router) {
    }

    public ngOnInit(): void {
        if (!this.todosState.hasTodos()) {
            this.todosState.getAllTasks();
        }
    }

    public onSearchTextInput(text: string): void {
        this.todosState.filterTodos(text);
    }

    public onDoneStateChange(todo: ITask): void {
        this.todosState.updateTodo(todo);
    }

    public onSelectTodo(todo: ITask): void {
        this.todosState.selectedTodo = todo;
        this.router.navigate(['/edit', todo.id]);
    }

    public onDeleteTodo(id: ITask['id']): void {
        this.todosState.deleteTodo(id);
    }
}
