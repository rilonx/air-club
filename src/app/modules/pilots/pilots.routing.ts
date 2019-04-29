import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PilotComponent, PilotsComponent } from '@app/modules/pilots/pages';
import { AuthGuard } from '@app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'pilots',
    component: PilotsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'pilot/:id/:operation',
    component: PilotComponent,
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
export class PilotsRoutingModule { }
