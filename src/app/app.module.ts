import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './components/app/app.component';
import { TableComponent } from './components/table/table.component';
import { LoginComponent } from './components/login/login.component';
import { routing } from './app.routing';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { InputComponent } from './components/input/input.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    TableComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
		BrowserModule,
		HttpClientModule,
    ReactiveFormsModule,
    routing,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

],
  bootstrap: [AppComponent]
})
export class AppModule { }
