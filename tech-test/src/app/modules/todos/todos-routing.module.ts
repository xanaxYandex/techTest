import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodosComponent} from './components/todos/todos.component';
import {TodoDetailedComponent} from './components/todo-detailed/todo-detailed.component';

const routes: Routes = [
    {path: 'list', component: TodosComponent},
    {path: 'create', component: TodoDetailedComponent},
    {path: 'edit/:id', component: TodoDetailedComponent},
    {path: '**', pathMatch: 'full', redirectTo: '/list'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
