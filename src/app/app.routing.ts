import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { InputComponent } from './components/input/input.component';
import { RegisterComponent } from './components/register/register.component';


const appRoutes: Routes = [
    {
        path: 'website',
        component: InputComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    }, 
    {
        path: 'register',
        component: RegisterComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: 'website' }
];

export const routing = RouterModule.forRoot(appRoutes);