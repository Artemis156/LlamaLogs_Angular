import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-edit-delete-modal',
  imports: [CommonModule, IonicModule],
  templateUrl: './edit-delete-modal.component.html',
  styleUrls: ['./edit-delete-modal.component.scss'],
})
export class EditDeleteModalComponent {
  @Input() visible: boolean = false;
  @Input() item: any;

  @Output() closeModal = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor() {
    addIcons({ createOutline, trashOutline});
  }

  close() {
    this.closeModal.emit();
  }

  onEdit() {
    this.edit.emit(this.item);
  }

  onDelete() {
    this.delete.emit(this.item);
  }
}
