import {ITask} from '../../models/Task';
import {Observable, of} from 'rxjs';
import {TodoApiService} from '../../services/api/todo-api.service';

export const MOCK_TODO_ARRAY: ITask[] = [
    {
        id: 1,
        label: 'Todo 1',
        description: 'Todo 1 description',
        category: 'Todo 1 category',
        done: false
    },
    {
        id: 2,
        label: 'Todo 2',
        description: 'Todo 2 description',
        category: 'Todo 2 category',
        done: new Date()
    }
] ;

export const MOCK_TODO: ITask = {
    id: 2,
    label: 'Taxes 1',
    description: 'Start doing my taxes and contact my accountant jhon for advice. And something else that i forgot.',
    category: 'bureaucracy',
    done: false
};

export const MOCK_TODO_API_SERVICE: Partial<TodoApiService> = {
    getTaskList(): Observable<ITask[]> {
        return of([...MOCK_TODO_ARRAY]);
    },
    getTaskById(id: ITask['id']): Observable<ITask> {
        return of(MOCK_TODO_ARRAY.find(i => i.id === id));
    },
    createTask(payload: Omit<ITask, 'id'>): Observable<ITask> {
        return of({...payload, id: 6});
    },
    updateTaskById(id: ITask['id'], payload: ITask): Observable<ITask> {
        return of(payload);
    },
    deleteTaskById(id: ITask['id']): Observable<any> {
        return of(null);
    }
};
