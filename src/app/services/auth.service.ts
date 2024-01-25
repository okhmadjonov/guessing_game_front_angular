import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private regUrl = 'https://localhost:7025/api/Auth/register';
  private logUrl = 'https://localhost:7025/api/Auth/login';
  private readonly tokenKey = 'authToken';
  private readonly userKey = 'userData';

  constructor(private http: HttpClient) {}

  public setToken(token: string, email: string): void {
    localStorage.setItem(this.tokenKey, JSON.stringify({ token, email }));
  }

  public getToken(): any {
    return localStorage.getItem(this.tokenKey)
      ? JSON.parse(localStorage.getItem(this.tokenKey) as string)
      : null;
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  signIn(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(this.logUrl, body).pipe(
      tap((response: any) => {
        const token = response?.token;
        const email = response?.email;

        if (token) {
          this.setToken(token, email);
        }
      })
    );
  }

  signUp(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post(this.regUrl, body);
  }

  signOut(): void {
    this.removeToken();
  }

  isAuthenticated(): any {
    return this.getToken();
  }
}
