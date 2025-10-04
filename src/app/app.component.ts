import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { DatabaseService } from './services/database.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
constructor(private database: DatabaseService) {
  this.initApp();
}

  initApp() {
    //await this.database.initializPlugin();
    SplashScreen.hide();
  }
}
