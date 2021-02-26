import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPayPalModule } from "ngx-paypal";
import { AppComponent } from "./app.component";
import { PlanListComponent } from "./plan-list/plan-list.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: "", component: PlanListComponent }]),
    NgxPayPalModule,
  ],
  declarations: [AppComponent, PlanListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
