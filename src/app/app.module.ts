import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // 👈 wichtig

import { AppComponent } from './app.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DatabaseService } from './services/database.service';

export function initializeApp(databaseService: DatabaseService) {
  // WICHTIG: Die äußere Funktion muss eine innere Funktion zurückgeben!
  return () => databaseService.initializPlugin();
}
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    NgApexchartsModule,
    IonicModule.forRoot({
      mode: 'ios', // 👈 hier erzwingst du iOS-Design global
    }),
    AppComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [DatabaseService],
      multi: true,
    },
    DatabaseService,
  ],
})
export class AppModule {}
