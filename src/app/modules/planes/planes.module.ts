import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@app/core/core.module';
import { FormsModule } from '@angular/forms';
import { PlanesRoutingModule } from '@app/modules/planes/planes.routing';

import { AirportService } from '@app/shared/services/airport.service';
import { PlaneComponent, PlanesComponent } from '@app/modules/planes/pages';

@NgModule({
  declarations: [
    PlanesComponent,
    PlaneComponent
  ],
  providers: [
    AirportService
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    PlanesRoutingModule
  ]
})
export class PlanesModule { }
