// En tu proyecto Ionic: src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  token: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private _user = new BehaviorSubject<AuthResponse | null>(null);

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  get user() {
    return this._user.asObservable();
  }

  get isLoggedIn(): boolean {
    return !!this._user.value;
  }

  get token(): string | null {
    return this._user.value?.token || null;
  }

  private async loadStoredUser() {
    const storedData = await Preferences.get({ key: 'authData' });
    if (storedData.value) {
      const userData = JSON.parse(storedData.value);
      this._user.next(userData);
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, {
      email,
      password
    }).pipe(
      tap(user => {
        this._user.next(user);
        Preferences.set({
          key: 'authData',
          value: JSON.stringify(user)
        });
      })
    );
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, {
      name,
      email,
      password
    }).pipe(
      tap(user => {
        this._user.next(user);
        Preferences.set({
          key: 'authData',
          value: JSON.stringify(user)
        });
      })
    );
  }

  logout(): Promise<void> {
    this._user.next(null);
    return Preferences.remove({ key: 'authData' });
  }
}
