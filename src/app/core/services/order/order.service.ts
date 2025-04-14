import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

export interface OrderItem {
  id: string;
  serviceId: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  deliveryDate?: Date;
}

export interface CreateOrderRequest {
  customerId: string;
  items: OrderItem[];
  deliveryDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private apiService: ApiService) {}

  async getCustomerOrders(): Promise<Observable<Order[]>> {
    return await this.apiService.get<Order[]>('/orders/customer');
  }

  async createOrder(order: CreateOrderRequest): Promise<Observable<Order>> {
    return await this.apiService.post<Order>('/orders', order);
  }
}
