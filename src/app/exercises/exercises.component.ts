import { Component, OnInit } from '@angular/core';
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
import { EditDeleteModalComponent } from '../exercises/edit-delete-modal/edit-delete-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { DatabaseService, Exercise } from '../services/database.service';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    EditDeleteModalComponent,
    DeleteModalComponent,
    EditModalComponent,
  ],
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent{
  exercises: Exercise[] = this.database.getExercises();
  selectedExercise: any = null;
  menuVisible = false;
  selectedItem: any = null;
  confirmVisible = false;
  editVisible = false;
  isEditing = false;

  editName = '';
  editType = '';
  editDescription = '';

  constructor(private database: DatabaseService) {
    addIcons({ fitness, barbell, body, addCircleOutline, ellipsisVertical });
  }

  onEditExercise(item: any) {
    this.selectedItem = item;
    this.menuVisible = true;
  }

  openEditModal(item?: any) {
    this.menuVisible = false;
    this.isEditing = !!item;
    this.editName = item?.name || '';
    this.editType = item?.type || 'Strength';
    this.editDescription = item?.description || '';
    this.selectedItem = item;
    this.editVisible = true;
  }

  onDeleteConfirm() {
    this.deleteExercise(this.selectedItem.id);
  }

  deleteExercise(id: number) {
    console.log('Lösche Übung mit ID:', id);

    this.database.deleteExercise(id);
    this.exercises = this.database.getExercises();
    this.confirmVisible = false;
    this.menuVisible = false;
    this.selectedItem = null;
  }

  saveEdit(data: { name: string; type: string; description: string }) {
    if (this.isEditing && this.selectedItem) {
      console.log('Edit Exercise');
      this.selectedItem.name = data.name;
      this.selectedItem.type = data.type;
      this.selectedItem.description = data.description;
      this.database.updateExercise(this.selectedItem);
      this.exercises = this.database.getExercises();
    } else {
      console.log('Create Exercise');
      this.database.addExercise(data);
      this.exercises = this.database.getExercises();
    }

    this.editVisible = false;
  }

  getIconName(type: string): string {
    switch (type) {
      case 'Strength':
        return 'barbell';
      case 'Cardio':
        return 'fitness';
      case 'Bodyweight':
        return 'body';
      default:
        return 'fitness';
    }
  }

  openAddModal() {
    this.isEditing = false;
    this.editName = '';
    this.editType = 'Strength';
    this.editDescription = '';
    this.editVisible = true;
  }
}
