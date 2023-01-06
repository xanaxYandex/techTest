import {fakeAsync, TestBed} from '@angular/core/testing';

import {TodosStateService} from './todos-state.service';
import {ITask} from '../../models/Task';
import {MOCK_TODO_API_SERVICE, MOCK_TODO_ARRAY} from '../../shared/testing/test-mocks';
import {TodoApiService} from '../../services/api/todo-api.service';
import {skip} from 'rxjs/operators';

describe('TodosStateService', () => {
    let service: TodosStateService;
    let fakeTodoApiService: Partial<TodoApiService>;

    beforeEach(() => {
        fakeTodoApiService = MOCK_TODO_API_SERVICE;
        TestBed.configureTestingModule({
            providers: [
                {provide: TodoApiService, useValue: fakeTodoApiService},
                TodosStateService
            ]
        });
        service = TestBed.inject(TodosStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fill out the todos array', fakeAsync(() => {
        service.todos$.pipe(skip(1)).subscribe((res) => {
            expect(JSON.stringify(res)).toEqual(JSON.stringify(MOCK_TODO_ARRAY));
            expect(service.hasTodos()).toEqual(true);
        });
        service.getAllTasks();
    }));

    it('should update array with created todo', fakeAsync(() => {
        const todo: Omit<ITask, 'id'> = {
            label: 'Test label',
            description: 'Test description',
            category: 'Test category',
            done: false
        };
        service.todos$.pipe(skip(2)).subscribe((res) => {
            expect(res.length).toEqual(MOCK_TODO_ARRAY.length + 1);
            expect(res[res.length - 1].label).toEqual(todo.label);
        });
        service.getAllTasks();
        service.createTodo(todo);
    }));

    it('should update array after deletion of todo', fakeAsync(() => {
        service.todos$.pipe(skip(2)).subscribe((res) => {
            expect(res.length).toEqual(MOCK_TODO_ARRAY.length - 1);
        });
        service.getAllTasks();
        service.deleteTodo(MOCK_TODO_ARRAY[0].id);
    }));

    it('should update todo in array', fakeAsync(() => {
        const updatedTodo: ITask = {
            ...MOCK_TODO_ARRAY[0],
            label: 'Updated todo'
        };
        service.todos$.pipe(skip(2)).subscribe((res) => {
            expect(res[0].label).toEqual(updatedTodo.label);
        });
        service.getAllTasks();
        service.updateTodo(updatedTodo);
    }));

    it('should update selectedItem when getTodo is called', fakeAsync(() => {
        service.selectedItem$.pipe(skip(1)).subscribe((res) => {
            expect(JSON.stringify(res)).toEqual(JSON.stringify(MOCK_TODO_ARRAY[0]));
        });
        service.getAllTasks();
        service.getTodo(MOCK_TODO_ARRAY[0].id);
    }));
});
