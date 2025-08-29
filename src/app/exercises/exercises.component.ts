import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercises.service';
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
export class ExercisesComponent implements OnInit {
  exercises: any[] = [];
  selectedExercise: any = null;
  menuVisible = false;
  selectedItem: any = null;
  confirmVisible = false;
  editVisible = false;
  isEditing = false;

  editName = '';
  editType = '';
  editDescription = '';

  constructor(private exerciseService: ExerciseService) {
    addIcons({ fitness, barbell, body, addCircleOutline, ellipsisVertical });
  }

  async ngOnInit(): Promise<void> {
    this.exercises = await this.exerciseService.getExercises();
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
    this.menuVisible = false;
    this.confirmVisible = true;
  }

  deleteExercise(id: number) {
    console.log('Lösche Übung mit ID:', id);
    // Hier deine Löschlogik einfügen (z. B. aus der Liste entfernen oder aus JSON-Datei)
  }

  saveEdit(data: { name: string; type: string; description: string }) {
    if (this.isEditing && this.selectedItem) {
      console.log('Edit Exercise');
      // Update logic here
      this.selectedItem.name = data.name;
      this.selectedItem.type = data.type;
      this.selectedItem.description = data.description;
    } else {
      console.log('Create Exercise');
      // Create logic here
      const newItem = {
        id: Date.now(),
        ...data,
      };
      this.exercises.push(newItem);
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
