import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  fitness,
  barbell,
  body,
  addCircleOutline,
  ellipsisVertical,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.component.html',
  styleUrls: ['./add-weight.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class AddWeightComponent {
  constructor() {
    addIcons({ fitness, barbell, body, addCircleOutline, ellipsisVertical });
  }

  @Input() visible = false;
  @Input() weight: number | null = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<{
    weight: number | null;
  }>();

  get disabled() {
    return this.weight === null || this.weight <= 0;
  }

  close() {
    this.closeModal.emit();
  }

  save() {
    this.saveChanges.emit({
      weight: this.weight,
    });
    this.weight = null;
  }
}
