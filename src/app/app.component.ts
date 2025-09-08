import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { DatabaseService } from './services/database.service';
import { DatabaseWorkoutService } from './services/database_workout.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
constructor(private database: DatabaseService, private databaseWorkout: DatabaseWorkoutService) {
  this.initApp();
}

  async initApp() {
    await this.database.initializPlugin();
    await this.databaseWorkout.initializPlugin();
    SplashScreen.hide();
  }
}
