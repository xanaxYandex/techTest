import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {TodosStateService} from '../../todos-state.service';
import {ITask} from '../../../../models/Task';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-todo-detailed',
    templateUrl: './todo-detailed.component.html',
    styleUrls: ['./todo-detailed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailedComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

    public id: number | null = null;
    public selectedTodo: ITask | null = null;

    public form = this.fb.group({
        label: ['', [Validators.required]],
        description: [''],
        category: [''],
    });

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private todosState: TodosStateService,
        private cdr: ChangeDetectorRef,
        private router: Router
    ) {
    }

    public ngOnInit(): void {
        this.id = this.route.snapshot.params.id;
        this.initForm();
    }

    private initForm(): void {
        if (this.id) {
            this.subscription = this.todosState.selectedItem$.subscribe((todo) => {
                if (todo) {
                    this.selectedTodo = todo;
                    this.form.patchValue({
                        label: todo.label,
                        description: todo.description,
                        category: todo.category
                    });
                    this.cdr.markForCheck();
                } else {
                    this.todosState.getTodo(this.id);
                }
            });
        }
    }

    public onSubmit(): void {
        let newTodo: ITask;
        newTodo = this.id ?
            {...this.form.value, id: this.selectedTodo.id, done: this.selectedTodo.done} :
            {...this.form.value, done: false};

        if (this.id) {
            this.todosState.updateTodo(newTodo);
        } else {
            this.todosState.createTodo(newTodo);
        }

        this.router.navigate(['/list']);
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.todosState.selectedTodo = null;
    }
}
