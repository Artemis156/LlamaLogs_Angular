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
  selector: 'app-edit-modal',
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  constructor() {
    addIcons({ fitness, barbell, body, addCircleOutline, ellipsisVertical });
  }

  @Input() visible = false;
  @Input() isEditing = false;

  @Input() editName: string = '';
  @Input() editType: string = 'Strength';
  @Input() editDescription: string = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<{
    name: string;
    type: string;
    description: string;
  }>();

  types = ['Strength', 'Cardio', 'Bodyweight'];

  close() {
    this.closeModal.emit();
  }

  save() {
    this.saveChanges.emit({
      name: this.editName,
      type: this.editType,
      description: this.editDescription,
    });
    this.editName = '';
    this.editType = 'Strength';
    this.editDescription = '';
  }
}
