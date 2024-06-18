import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "payment",
    loadChildren: () =>
      import("./payment/payment.module").then((m) => m.PaymentModule),
  },
  {
    path: "",
    redirectTo: "payment",
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
