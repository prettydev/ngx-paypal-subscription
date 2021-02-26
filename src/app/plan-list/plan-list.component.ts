import { Component, OnInit, ViewChild } from "@angular/core";
import {
  PayPalScriptService,
  IPayPalConfig,
  NgxPaypalComponent,
} from "ngx-paypal";
import { environment } from "../../environments/environment";
import { plans } from "../plans";

@Component({
  selector: "app-plan-list",
  templateUrl: "./plan-list.component.html",
  styleUrls: ["./plan-list.component.css"],
})
export class PlanListComponent implements OnInit {
  private plans = [];
  public configs = {};

  @ViewChild("basic") basicSubscription?: NgxPaypalComponent;
  @ViewChild("advanced") advancedSubscription?: NgxPaypalComponent;

  constructor(private payPalScriptService: PayPalScriptService) {
    this.plans = plans;
  }

  ngOnInit() {
    this.plans.map((plan) => {
      this.configs[plan.name] = this.getConfig(plan.id);
    });
    this.payPalScriptService.registerPayPalScript(
      {
        clientId: environment.paypalKey,
        currency: "USD",
        vault: "true",
      },
      (payPalApi) => {
        if (this.basicSubscription) {
          this.basicSubscription.customInit(payPalApi);
        }
        if (this.advancedSubscription) {
          this.advancedSubscription.customInit(payPalApi);
        }
      }
    );
  }

  getConfig(plan_id: string): IPayPalConfig {
    return {
      clientId: environment.paypalKey,
      currency: "USD",
      vault: "true",
      style: {
        label: "paypal",
        layout: "vertical",
        size: "small",
        shape: "pill",
        color: "silver",
        tagline: false,
      },
      createSubscription: function (data, actions) {
        return actions.subscription.create({
          plan_id,
        });
      },
      onApprove: function (data, actions) {
        console.log("subscription data:", data);
        actions.subscription.get().then((details) => {
          console.log("subscription details:", details);
          alert("Success to subscribe!");
        });
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
      },
      onError: (err) => {
        console.log("OnError", err);
      },
      onClick: (data, actions) => {
        console.log("Clicked:", data, actions);
      },
    };
  }
}
