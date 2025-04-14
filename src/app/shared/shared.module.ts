import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';

@NgModule({
  imports: [
    CommonModule,
    CustomInputComponent,
    CustomButtonComponent
  ],
  exports: [
    CustomInputComponent,
    CustomButtonComponent
  ]
})
export class SharedModule { }
