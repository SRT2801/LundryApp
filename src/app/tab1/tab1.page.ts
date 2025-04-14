import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../core/services/service/Service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  services: any[] = [];
  connectionError: string | null = null;
  isLoading = false;

  constructor(private serviceService: ServiceService) {}

  async ngOnInit() {
    this.testBackendConnection();
  }

  async testBackendConnection() {
    this.isLoading = true;
    try {
      const servicesObservable = await this.serviceService.getServices();
      servicesObservable.subscribe({
        next: (data) => {
          console.log('Datos recibidos del backend:', data);
          this.services = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al conectar con el backend:', error);
          this.connectionError = `Error de conexión: ${
            error.message || 'Desconocido'
          }`;
          this.isLoading = false;
        },
      });
    } catch (err) {
      console.error('Error al iniciar la petición:', err);
      this.connectionError = `Error al iniciar la petición: ${err}`;
      this.isLoading = false;
    }
  }
}
