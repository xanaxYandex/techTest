import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TodosComponent} from './todos.component';
import {TodosStateService} from '../../todos-state.service';
import {ITask} from '../../../../models/Task';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {BehaviorSubject} from 'rxjs';
import {CommonModule} from '@angular/common';
import {MOCK_TODO, MOCK_TODO_ARRAY} from '../../../../shared/testing/test-mocks';
import {findEl} from '../../../../shared/testing/test-helpers';
import {By} from '@angular/platform-browser';

describe('TodosComponent', () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;
    let fakeTodosStateService: Partial<TodosStateService>;

    const mockTodosArr = [...MOCK_TODO_ARRAY];

    beforeEach(async () => {
        fakeTodosStateService = {
            todos$: new BehaviorSubject<ITask[]>(mockTodosArr),
            loading$: new BehaviorSubject<boolean>(false),
            getAllTasks() {
            },
            updateTodo(todo: ITask) {
            },
            deleteTodo(id: number) {
            },
            hasTodos(): boolean {
                return true;
            },
            filterTodos(text: string) {
            }
        };
        await TestBed.configureTestingModule({
            declarations: [TodosComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [CommonModule, RouterTestingModule.withRoutes([])],
            providers: [
                // {provide: Router, useValue: {}},
                {provide: TodosStateService, useValue: fakeTodosStateService}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should display todo list', () => {
        const todoList = findEl(fixture, 'list');
        expect(todoList).toBeTruthy();
    });

    it('should display correct amount of todos', fakeAsync(() => {
        const todos = findEl(fixture, 'list').queryAll(By.css('app-todo-item'));

        expect(todos.length).toEqual(mockTodosArr.length);
    }));

    it('should react on selectTodo event', fakeAsync(() => {
        const onSelectTodoSpy = spyOn(component, 'onSelectTodo');
        const todos = findEl(fixture, 'list').queryAll(By.css('app-todo-item'));
        todos[0].triggerEventHandler('selectTodo', mockTodosArr[0].id);

        expect(onSelectTodoSpy).toHaveBeenCalledWith(mockTodosArr[0].id);
    }));

    it('should react on deleteTodo event', fakeAsync(() => {
        const onDeleteTodoStateSpy = spyOn((component as any).todosState, 'deleteTodo');
        const todos = findEl(fixture, 'list').queryAll(By.css('app-todo-item'));
        todos[0].triggerEventHandler('deleteTodo', mockTodosArr[0].id);

        expect(onDeleteTodoStateSpy).toHaveBeenCalledWith(mockTodosArr[0].id);
    }));

    it('should react on doneStateChange event', fakeAsync(() => {
        const onUpdateTodoStateSpy = spyOn((component as any).todosState, 'updateTodo');
        const todos = findEl(fixture, 'list').queryAll(By.css('app-todo-item'));
        todos[0].triggerEventHandler('doneStateChange', mockTodosArr[0]);

        expect(onUpdateTodoStateSpy).toHaveBeenCalledWith(mockTodosArr[0]);
    }));

    it('should display loader when loading is true', fakeAsync(() => {
        ((component as any).todosState as TodosStateService).loading$.next(true);
        fixture.detectChanges();
        const loader = findEl(fixture, 'loader');
        expect(loader).toBeTruthy();
    }));

    it('should react on todos state change', fakeAsync(() => {
        const todoArr = [MOCK_TODO, MOCK_TODO, MOCK_TODO];
        ((component as any).todosState as TodosStateService).todos$.next(todoArr);
        fixture.detectChanges();
        const todos = findEl(fixture, 'list').queryAll(By.css('app-todo-item'));
        expect(todos.length).toEqual(todoArr.length);
    }));

    it('should react on input', fakeAsync(() => {
        const testInput = 'test';
        const onFilterTodosStateSpy = spyOn((component as any).todosState, 'filterTodos');
        const searchInput = findEl(fixture, 'search-input');
        searchInput.triggerEventHandler('ngModelChange', testInput);

        expect(onFilterTodosStateSpy).toHaveBeenCalledWith(testInput);
    }));
});
