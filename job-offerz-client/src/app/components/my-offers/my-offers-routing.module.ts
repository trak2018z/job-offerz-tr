import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyOffersComponent} from "./my-offers.component";
import {OfferDetailsComponent} from "../../shared/components/offer-details/offer-details.component";

const routes: Routes = [
  {path: '', component: MyOffersComponent},
  {path: 'add', loadChildren:  'app/components/add-offer/add-offer.module#AddOfferModule'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOffersRoutingModule { }