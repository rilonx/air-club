import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@app/core/core.module';
import { FormsModule } from '@angular/forms';
import { AirportsRoutingModule } from '@app/modules/airports/airports.routing';

import { AirportService } from '@app/shared/services/airport.service';
import { AirportsComponent, AirportComponent } from '@app/modules/airports/pages';

@NgModule({
  declarations: [
    AirportsComponent,
    AirportComponent,
  ],
  providers: [
    AirportService
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    AirportsRoutingModule
  ]
})
export class AirportsModule { }
