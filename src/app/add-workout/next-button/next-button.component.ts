import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-button',
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.scss'],
})
export class NextButtonComponent {

  @Input() saveExercise!: () => Promise<boolean>;
  @Input() disabled: boolean = false;

  constructor(private router: Router) {}

  async handleNext() {
    const success = await this.saveExercise();
    if (success) {
      this.router.navigate(['/add_workout/select_exercise'], {
      });
    }
  }
}
