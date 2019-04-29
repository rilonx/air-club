import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectPlaneComponent } from '@app/shared/components/select-plane/select-plane.component';
import { SelectPilotComponent } from '@app/shared/components/select-pilot/select-pilot.component';

@NgModule({
  declarations: [
    SelectPlaneComponent,
    SelectPilotComponent
  ],
  providers: [],
  entryComponents: [
    SelectPilotComponent,
    SelectPlaneComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    SelectPlaneComponent,
    SelectPilotComponent
  ]
})
export class SharedModule { }
