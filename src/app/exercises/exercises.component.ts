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
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    EditDeleteModalComponent,
    DeleteModalComponent,
    EditModalComponent,
    SpinnerComponent,
  ],
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {
  exercises: Exercise[] = this.database.getExercises();
  selectedExercise: any = null;
  menuVisible = false;
  selectedItem: any = null;
  confirmVisible = false;
  editVisible = false;
  isEditing = false;

  loading = false;

  editName = '';
  editType = '';
  editDescription = '';

  constructor(private database: DatabaseService) {
    addIcons({ fitness, barbell, body, addCircleOutline, ellipsisVertical });
  }

  async ngOnInit() {
    await this.loadExercises();
  }

  async loadExercises() {
    this.loading = true;
    try {
      this.exercises = await this.database.getExercises(); // muss async sein
    } finally {
      this.loading = false;
    }
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

  async deleteExercise(id: number) {
    //es müssen noch alle referenzen in workout_exercises gelöscht werden
    this.loading = true;
    try {
      await this.database.deleteExercise(id);
      await this.loadExercises();
      this.confirmVisible = false;
      this.menuVisible = false;
      this.selectedItem = null;
    } finally {
      this.loading = false;
    }
  }

  async saveEdit(data: { name: string; type: string; description: string }) {
    this.loading = true;
    try {
      if (this.isEditing && this.selectedItem) {
        this.selectedItem.name = data.name;
        this.selectedItem.type = data.type;
        this.selectedItem.description = data.description;
        await this.database.updateExercise(this.selectedItem);
      } else {
        await this.database.addExercise(data);
      }
      await this.loadExercises();
    } finally {
      this.loading = false;
      this.editVisible = false;
    }
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
