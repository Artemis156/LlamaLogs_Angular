import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";  // 👈 wichtig

import { AppComponent } from "./app.component";
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    NgApexchartsModule,
    IonicModule.forRoot({
      mode: 'ios'   // 👈 hier erzwingst du iOS-Design global
    }),
    AppComponent
  ],
  providers: [],
})
export class AppModule {}
