import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { HttpClientModule} from '@angular/common/http';
import {ENVIRONMENT} from './shared/utils/tokens';
import {environment} from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        {provide: ENVIRONMENT, useValue: environment}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
