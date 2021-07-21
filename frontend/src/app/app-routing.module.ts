import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureComponent } from './feature/feature.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [ 
  { path: '', component: LandingPageComponent },
  { path: 'database', component: FeatureComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
