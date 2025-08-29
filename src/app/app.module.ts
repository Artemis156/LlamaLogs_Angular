import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  imports: [BrowserModule, NgApexchartsModule, AppComponent],
  providers: [],
})
export class AppModule {}
