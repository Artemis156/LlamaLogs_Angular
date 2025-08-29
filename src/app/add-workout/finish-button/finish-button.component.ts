import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-button',
  templateUrl: './finish-button.component.html',
  styleUrls: ['./finish-button.component.scss'],
})
export class FinishButtonComponent {
  @Input() saveExercise!: () => Promise<boolean>;
  @Input() disabled: boolean = false;

  constructor(private router: Router) {}

  async handleFinish() {
    const success = await this.saveExercise();
    if (success) {
      this.router.navigate(['/tabs']); // Passe ggf. den Pfad an deine Routingstruktur an
    }
  }
}
