import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/todos/todos.module').then(m => m.TodosModule)
    },
    {path: '**', pathMatch: 'full', redirectTo: '/'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
