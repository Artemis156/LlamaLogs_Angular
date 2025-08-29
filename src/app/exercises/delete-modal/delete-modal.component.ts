import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-delete-modal',
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  constructor() {}
  @Input() visible: boolean = false;
  @Input() itemId: number | null = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<number>();

  close() {
    this.closeModal.emit();
  }

  confirmDelete() {
    if (this.itemId !== null) {
      this.confirm.emit(this.itemId);
    }
    this.close();
  }
}
