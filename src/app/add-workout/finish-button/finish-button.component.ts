import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/services/refresh.service';


@Component({
  selector: 'app-finish-button',
  templateUrl: './finish-button.component.html',
  styleUrls: ['./finish-button.component.scss'],
})
export class FinishButtonComponent {
  @Input() saveExercise!: () => Promise<boolean>;
  @Input() disabled: boolean = false;

  constructor(private router: Router, private refreshService: RefreshService) {}

  async handleFinish() {
    const success = await this.saveExercise();
    if (success) {
      this.refreshService.notifyRefresh(); // Benachrichtige andere Komponenten über die Aktualisierung
      this.router.navigate(['/tabs']); // Passe ggf. den Pfad an deine Routingstruktur an
    }
  }
}
