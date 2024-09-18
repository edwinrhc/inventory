import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./modules/dashboard/components/home/home.component";
import {DashboardRoutingModule} from "./modules/dashboard/dashboard-routing.module";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/dashboard'},

];

@NgModule({
  imports: [RouterModule.forRoot(
          routes,
    {enableTracing: false, useHash: true}),
    DashboardRoutingModule

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
