import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  password: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = '/data/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(this.url).pipe(map(r => r.users || []));
  }

  /**
   * Valida usuario y contraseña. Retorna el usuario si coincide o null si no.
   */
  validate(username: string, password: string): Observable<User | null> {
    if (!username || !password) return of(null);
    return this.getUsers().pipe(
      map(users => users.find(u => u.username === username && u.password === password) ?? null)
    );
  }
}
