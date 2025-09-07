import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User, UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private userService: UserService) {
    // Try to restore persisted user from localStorage
    try {
      const json = localStorage.getItem('currentUser');
      if (json) {
        const parsed = JSON.parse(json) as User;
        this.currentUserSubject.next(parsed);
      }
    } catch (e) {
      // ignore malformed data or unavailable storage
    }
  }

  login(username: string, password: string): Observable<User | null> {
    return this.userService.validate(username, password).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
        try {
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          } else {
            localStorage.removeItem('currentUser');
          }
        } catch (e) {
          // ignore storage errors
        }
      })
    );
  }

  logout() {
    this.currentUserSubject.next(null);
    try {
      localStorage.removeItem('currentUser');
    } catch (e) {}
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(map(u => !!u));
  }
}
