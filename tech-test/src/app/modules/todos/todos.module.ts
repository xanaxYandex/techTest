import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodosRoutingModule} from './todos-routing.module';
import {TodosComponent} from './components/todos/todos.component';
import {TodoItemComponent} from './components/todo-item/todo-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderModule} from '../../shared/components/loader/loader.module';
import {CustomInputModule} from '../../shared/components/custom-input/custom-input.module';
import {TodoDetailedComponent} from './components/todo-detailed/todo-detailed.component';


@NgModule({
    declarations: [
        TodosComponent,
        TodoItemComponent,
        TodoDetailedComponent
    ],
    imports: [
        CommonModule,
        TodosRoutingModule,
        FormsModule,
        LoaderModule,
        CustomInputModule,
        ReactiveFormsModule
    ]
})
export class TodosModule {
}
