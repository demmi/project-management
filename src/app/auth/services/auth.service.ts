import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      'http://localhost:4200/api/signin',
      {
        login: user.login,
        password: user.password,
      },
    );
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:4200/api/signup',
      {
        name: user.name,
        login: user.login,
        password: user.password,
      });
  }

}
