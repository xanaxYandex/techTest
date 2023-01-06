import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TodoDetailedComponent} from './todo-detailed.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TodosStateService} from '../../todos-state.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ITask} from '../../../../models/Task';
import {TodoApiService} from '../../../../services/api/todo-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomInputComponent} from '../../../../shared/components/custom-input/custom-input.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MOCK_TODO} from '../../../../shared/testing/test-mocks';
import {findEl} from '../../../../shared/testing/test-helpers';


describe('TodoDetailedComponent', () => {
    let component: TodoDetailedComponent;
    let fixture: ComponentFixture<TodoDetailedComponent>;
    let fakeTodoApiService: Pick<TodoApiService, 'getTaskById' | 'updateTaskById' | 'createTask'>;
    let fakeTodosStateService: Partial<TodosStateService>;

    beforeEach(async () => {
        fakeTodoApiService = {
            getTaskById(id: ITask['id']): Observable<ITask> {
                return of(MOCK_TODO);
            },
            createTask(payload: Omit<ITask, 'id'>): Observable<ITask> {
                return of(MOCK_TODO);
            },
            updateTaskById(id: ITask['id'], payload: ITask): Observable<ITask> {
                return of(MOCK_TODO);
            }
        };
        fakeTodosStateService = {
            selectedItem$: new BehaviorSubject<ITask | null>(null),
            set selectedTodo(value: ITask) {
                this.selectedItem$.next(value);
            },
            getTodo(id: number) {
            },
            updateTodo(todo: ITask) {
            },
            deleteTodo(id: number) {
            },
        };

        await TestBed.configureTestingModule({
            declarations: [TodoDetailedComponent, CustomInputComponent],
            imports: [ReactiveFormsModule, FormsModule],
            providers: [
                {provide: TodoApiService, useValue: fakeTodoApiService},
                {provide: TodosStateService, useValue: fakeTodosStateService},
                {provide: ActivatedRoute, useValue: {snapshot: {params: {id: 2}}}},
                {provide: Router, useValue: {}},
                FormBuilder
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoDetailedComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('submit button should be disabled when form is invalid', () => {
        fixture.detectChanges();
        const submit = findEl(fixture, 'submit');
        expect(submit.properties.disabled).toEqual(true);
    });

    it('submit button should be disabled when form is invalid', () => {
        component.form.patchValue({
            label: 'test label',
            description: 'test desc',
            category: 'test category'
        });
        fixture.detectChanges();
        const submit = findEl(fixture, 'submit');
        expect(submit.properties.disabled).toEqual(false);
    });

    it('should update form with selected item', fakeAsync(() => {
        ((component as any).todosState as TodosStateService).selectedTodo = MOCK_TODO;
        fixture.detectChanges();
        const label = findEl(fixture, 'label');

        expect(component.form.value.label).toEqual(MOCK_TODO.label);
        expect(label.componentInstance.innerValue).toEqual(MOCK_TODO.label);
    }));

    it('should react on custom-input value change', () => {
        const testInput = 'test123';
        fixture.detectChanges();
        const label = findEl(fixture, 'label');
        label.componentInstance.value = testInput;
        expect(component.form.value.label).toEqual(testInput);
    });
});
