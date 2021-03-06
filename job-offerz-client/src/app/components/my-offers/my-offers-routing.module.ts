import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyOffersComponent} from "./my-offers.component";

const routes: Routes = [
  {path: '', component: MyOffersComponent},
  {path: 'add', loadChildren:  'app/components/add-offer/add-offer.module#AddOfferModule'},
  {path: 'edit/:id', loadChildren:  'app/components/edit-offer/edit-offer.module#EditOfferModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOffersRoutingModule { }
