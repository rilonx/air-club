import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IResponse, Plane } from '@app/shared/models';
import { PlaneService } from '@app/shared/services/plane.service';

@Component({
  selector: 'select-plane',
  templateUrl: './select-plane.component.html',
  styleUrls: ['./select-plane.component.css']
})
export class SelectPlaneComponent implements OnInit {
  planeList: Plane[] = [];
  planeId: any;

  constructor(
    public modal: NgbActiveModal,
    private planeService: PlaneService
  ) {
  }

  ngOnInit() {
    this.planeService.get().subscribe((response: IResponse<Plane>) => {
      this.planeList = response.data;
    });
  }

  save() {
    this.modal.close(this.planeList.find(plane => plane.id === +this.planeId));
  }

  close() {
    this.modal.close(null);
  }
}
