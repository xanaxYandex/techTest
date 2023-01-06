import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITask} from '../../models/Task';
import {ENVIRONMENT} from '../../shared/utils/tokens';
import {IEnvironment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TodoApiService {
    private url = `${this.env.apiUrl}/tasks`;

    constructor(
        private http: HttpClient,
        @Inject(ENVIRONMENT) private env: IEnvironment
    ) {
    }

    public getTaskList(): Observable<ITask[]> {
        return this.http.get<ITask[]>(`${this.url}`);
    }

    public getTaskById(id: ITask['id']): Observable<ITask> {
        return this.http.get<ITask>(`${this.url}/${id}`);
    }

    public createTask(payload: Omit<ITask, 'id'>): Observable<ITask> {
        return this.http.post<ITask>(`${this.url}`, payload);
    }

    public updateTaskById(id: ITask['id'], payload: ITask): Observable<ITask> {
        return this.http.patch<ITask>(`${this.url}/${id}`, payload);
    }

    public deleteTaskById(id: ITask['id']): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`);
    }
}
