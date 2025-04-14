import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedTimeInHours: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private apiService: ApiService) {}

  async getServices(): Promise<Observable<Service[]>> {
    return await this.apiService.get<Service[]>('/services');
  }

  async getService(id: string): Promise<Observable<Service>> {
    return await this.apiService.get<Service>(`/services/${id}`);
  }
}
