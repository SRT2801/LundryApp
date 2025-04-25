import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Order, OrderService } from '../core/services/order/order.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class Tab1Page implements OnInit {
  orders: Order[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  async loadOrders() {
    this.isLoading = true;
    this.errorMessage = null;
    this.orders = [];

    try {
      const ordersObservable = await this.orderService.getCustomerOrders();
      ordersObservable.subscribe({
        next: (orders) => {
          this.orders = orders;
          this.isLoading = false;
          console.log('Orders loaded:', this.orders);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
        },
      });
    } catch (error) {
      console.error('Error loading orders:', error);
      this.isLoading = false;
      this.errorMessage = 'Failed to load orders. Please try again later.';
    }
  }

  handleRefresh(event: any) {
    this.loadOrders();
    setTimeout(() => {
      event.target.complete();
    });
  }
}
