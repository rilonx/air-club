import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AirportsComponent, AirportComponent } from '@app/modules/airports/pages';
import { AuthGuard } from '@app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'airports',
    component: AirportsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'airport/:id/:operation',
    component: AirportComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AirportsRoutingModule { }
