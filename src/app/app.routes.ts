import { Routes } from '@angular/router';
import { provideRoutes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { LoginComponent } from './login.component';
import { ServicesComponent } from './services.component';
import { ServicesDetailComponent } from './services-detail.component';
import { ProximamenteComponent } from './proximamente.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
	{ path: '', component: LandingComponent }
	,{ path: 'login', component: LoginComponent }
	,{ path: 'services', component: ServicesComponent }
	,{ path: 'services/:id', component: ServicesDetailComponent }
	,{ path: 'proximamente', component: ProximamenteComponent }
	,{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
];
