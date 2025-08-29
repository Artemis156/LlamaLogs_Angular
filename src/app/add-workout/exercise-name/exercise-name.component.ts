import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Router } from '@angular/router';

interface Equipment {
  name: string;
  type: string;
  description?: string;
}

@Component({
  selector: 'app-exercise-name',
  imports: [CommonModule, IonicModule],
  templateUrl: './exercise-name.component.html',
  styleUrls: ['./exercise-name.component.scss'],
})
export class ExerciseNameComponent {
  constructor(private router: Router) {
    addIcons({ close });
  }

  @Input() selectedEquipment: Equipment | null = null;

  get name(): string {
    return this.selectedEquipment?.name ?? '';
  }

  handleDeselect() {
    this.router.navigate(['/add_workout/select_exercise']);
  }
}
