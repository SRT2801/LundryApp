import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    CustomInputComponent,
    CustomButtonComponent
  ]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  submitError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.isLoading = true;
    this.submitError = null;

    const { name, email, password } = this.registerForm.value;

    try {
      const loading = await this.loadingController.create({
        message: 'Registrando cuenta...'
      });
      await loading.present();

      this.authService.register(name, email, password).subscribe({
        next: (res) => {
          loading.dismiss();
          this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
        },
        error: (error) => {
          loading.dismiss();
          this.submitError = error.error?.message || 'Error al registrar la cuenta. Intenta nuevamente.';
          this.isLoading = false;
        }
      });
    } catch (error) {
      this.isLoading = false;
      this.submitError = 'Ocurrió un error inesperado. Intenta nuevamente.';
    }
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  // Utilidad para marcar todos los campos como tocados
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  // Getters mejorados para facilitar el acceso a los controles en el HTML
  get nameControl(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  get emailControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
}
