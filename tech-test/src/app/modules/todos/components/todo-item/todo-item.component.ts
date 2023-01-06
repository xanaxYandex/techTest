import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ITask} from '../../../../models/Task';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
    @Input() todo: ITask;
    @Output() doneStateChange = new EventEmitter<ITask>();
    @Output() selectTodo = new EventEmitter<ITask>();
    @Output() deleteTodo = new EventEmitter<ITask['id']>();

    public onDone(): void {
        this.doneStateChange.emit({
            ...this.todo,
            done: this.todo.done ? !this.todo.done : new Date()
        });
    }

    public onDelete(): void {
        this.deleteTodo.emit(this.todo.id);
    }

    public onSelect(): void {
        this.selectTodo.emit(this.todo);
    }

}
