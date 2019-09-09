import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

const ROUTES: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {useHash: true, enableTracing: !environment.production})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
