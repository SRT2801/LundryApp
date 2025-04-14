import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtener token de autenticación del almacenamiento local
  private async getToken(): Promise<string | null> {
    const authData = await Preferences.get({ key: 'authData' });
    if (!authData.value) return null;

    const parsedData = JSON.parse(authData.value);
    return parsedData.token || null;
  }

  // Crear headers con token de autenticación si existe
  private async createHeaders(): Promise<HttpHeaders> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const token = await this.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  // Métodos para interactuar con la API
  async get<T>(endpoint: string): Promise<Observable<T>> {
    const headers = await this.createHeaders();
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { headers });
  }

  async post<T>(endpoint: string, data: any): Promise<Observable<T>> {
    const headers = await this.createHeaders();
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data, { headers });
  }

  async put<T>(endpoint: string, data: any): Promise<Observable<T>> {
    const headers = await this.createHeaders();
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, data, { headers });
  }

  async patch<T>(endpoint: string, data: any): Promise<Observable<T>> {
    const headers = await this.createHeaders();
    return this.http.patch<T>(`${this.apiUrl}${endpoint}`, data, { headers });
  }

  async delete<T>(endpoint: string): Promise<Observable<T>> {
    const headers = await this.createHeaders();
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { headers });
  }
}
