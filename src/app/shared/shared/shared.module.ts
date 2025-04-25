import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { CustomButtonComponent } from '../components/custom-button/custom-button.component';

import { CardModule } from 'primeng/card';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../components/card/card.component';

const commonModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  IonicModule,
  CardModule,
];

const sharedComponents = [CardComponent];

@NgModule({
  imports: [...commonModules, ...sharedComponents],
  exports: [...commonModules, ...sharedComponents],
})
export class SharedModule {}
