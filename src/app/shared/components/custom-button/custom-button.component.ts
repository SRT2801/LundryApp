import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CustomButtonComponent {
  @Input() text: string = 'Botón';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() expand: 'block' | 'full' | undefined = undefined;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() color: string = 'primary';
  @Input() iconStart: string | null = null;
  @Input() iconEnd: string | null = null;
  @Input() shape: 'round' | undefined = undefined;
  @Input() fill: 'solid' | 'outline' | 'clear' = 'solid';
  @Input() size: 'small' | 'default' | 'large' = 'default';

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  }
}
