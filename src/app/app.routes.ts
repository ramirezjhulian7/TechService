import { Routes } from '@angular/router';
import { provideRoutes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { LoginComponent } from './login.component';
import { ServicesComponent } from './services.component';
import { ServicesDetailComponent } from './services-detail.component';

export const routes: Routes = [
	{ path: '', component: LandingComponent }
	,{ path: 'login', component: LoginComponent }
	,{ path: 'services', component: ServicesComponent }
	,{ path: 'services/:id', component: ServicesDetailComponent }
];
