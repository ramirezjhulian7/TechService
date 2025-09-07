import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.isAuthenticated().pipe(
      take(1),
      map(logged => {
        if (!logged) {
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      })
    );
  }
}
