import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PilotService } from '@app/shared/services';
import { IResponse, Pilot } from '@app/shared/models';

@Component({
  selector: 'select-pilot',
  templateUrl: './select-pilot.component.html',
  styleUrls: ['./select-pilot.component.css']
})
export class SelectPilotComponent implements OnInit {
  pilotList: Pilot[] = [];
  pilotId: any;

  constructor(
    public modal: NgbActiveModal,
    private pilotService: PilotService
  ) { }

  ngOnInit() {
    this.pilotService.get().subscribe((response: IResponse<Pilot>) => {
      this.pilotList = response.data;
    });
  }

  save() {
    this.modal.close(this.pilotList.find(pilot => pilot.id === +this.pilotId));
  }

  close() {
    this.modal.close(null);
  }

}
