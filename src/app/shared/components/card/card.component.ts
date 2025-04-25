
import { Component, Input, OnInit } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  styleUrls: ['./card.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class CardComponent implements OnInit {
  @Input() cardTitle?: string;
  @Input() cardSubtitle?: string;
  @Input() content?: string;
  @Input() imageUrl?: string;

  constructor() {}

  ngOnInit() {}
}
