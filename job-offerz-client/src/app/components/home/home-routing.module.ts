import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {OnlyLoggedOut} from "../../shared/guards/only-logged-out.service";
import {OnlyLoggedIn} from "../../shared/guards/only-logged-in.service";

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '',  loadChildren:  'app/components/landing/landing.module#LandingModule'},
      {
        path: 'login',
        loadChildren:  'app/components/login/login.module#LoginModule',
        canActivate: [OnlyLoggedOut]
      },
      {
        path: 'signup',
        loadChildren:  'app/components/signup/signup.module#SignupModule',
        canActivate: [OnlyLoggedOut]
      },
      {
        path: 'offers',
        loadChildren:  'app/components/offers/offers.module#OffersModule'
      },
      {
        path: 'my-offers',
        loadChildren:  'app/components/my-offers/my-offers.module#MyOffersModule',
        canActivate: [OnlyLoggedIn]
      },
      {
        path: 'admin-panel',
        loadChildren:  'app/components/admin-panel/admin-panel.module#AdminPanelModule'
      },
      {
        path: 'user-profile',
        loadChildren:  'app/components/user-profile/user-profile.module#UserProfileModule',
        canActivate: [OnlyLoggedIn]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
