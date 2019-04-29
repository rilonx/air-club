import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PlaneComponent, PlanesComponent } from '@app/modules/planes/pages';
import { AuthGuard } from '@app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'planes',
    component: PlanesComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'plane/:id/:operation',
    component: PlaneComponent,
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
export class PlanesRoutingModule { }
