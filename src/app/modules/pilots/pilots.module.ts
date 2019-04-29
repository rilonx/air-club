import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@app/core/core.module';
import { FormsModule } from '@angular/forms';
import { PilotsRoutingModule } from '@app/modules/pilots/pilots.routing';

import { AirportService } from '@app/shared/services/airport.service';
import { PilotsComponent, PilotComponent } from '@app/modules/pilots/pages';

@NgModule({
  declarations: [
    PilotsComponent,
    PilotComponent
  ],
  entryComponents: [],
  providers: [],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    PilotsRoutingModule
  ]
})
export class PilotsModule { }
