import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import {SharedModule} from "../../shared/modules/shared.module";
import {LandingComponent} from "./landing.component";

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ],
  declarations: [
    LandingComponent
  ]
})
export class LandingModule { }
