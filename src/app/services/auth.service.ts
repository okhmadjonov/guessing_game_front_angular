import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private regUrl = 'https://localhost:7025/api/Auth/register';
  private logUrl = 'https://localhost:7025/api/Auth/login';
  private readonly tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  signIn(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(this.logUrl, body).pipe(
      tap((response: any) => {
        const token = response?.token;

        if (token) {
          this.setToken(token);
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

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
