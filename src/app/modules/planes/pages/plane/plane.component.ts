import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormField } from '@app/shared/models/form-field';
import { Operations } from '@app/shared/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectPilotComponent } from '@app/shared/components/select-pilot/select-pilot.component';
import { Pilot, Plane } from '@app/shared/models';
import { PlaneService } from '@app/shared/services/plane.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.css']
})
export class PlaneComponent implements OnInit {
  plane: Plane;
  pilotList: Pilot[] = [];
  planeFields: FormField[];
  operation: Operations;
  errorMessage: string;
  Operations = Operations;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planeService: PlaneService,
    private modalService: NgbModal
  ) {
    this.planeFields = [
      {
        name: 'id',
        type: 'number',
        label: 'Id',
        isId: true
      },
      {
        name: 'code',
        type: 'text',
        label: 'Код',
        isId: false,
        validators: [Validators.required]
      },
      {
        name: 'type',
        type: 'text',
        label: 'Тип',
        isId: false,
        validators: [Validators.required]
      },
      {
        name: 'number',
        type: 'text',
        label: 'Борт номер',
        isId: false,
        validators: [Validators.required]
      },
      {
        name: 'brand',
        type: 'text',
        label: 'Марка',
        isId: false,
        validators: [Validators.required]
      },
      {
        name: 'model',
        type: 'text',
        label: 'Модель',
        isId: false,
        validators: [Validators.required]
      }
    ];
  }
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.operation = (+params['operation'] as Operations);
      if (this.operation === Operations.create) {
        this.plane = {
          id: 0,
          code: '',
          type: '',
          number: '',
          brand: '',
          model: '',
          pilots: []
        };
      } else {
        this.planeService.getById(params['id'])
          .subscribe((plane: Plane ) => {
            this.plane = plane;
            this.pilotList = (this.plane && this.plane.pilots && this.plane.pilots.length > 0) ? this.plane.pilots : [];
          });
      }
    });
  }

  create(plane: Plane) {
    this.planeService.create(plane).subscribe(response => {
      this.router.navigate(['planes']);
    });
  }
  update(plane: Plane) {
    this.planeService.update(plane).subscribe(response => {
      this.router.navigate(['planes']);
    });
  }
  addPilot() {
    const modal = this.modalService.open(SelectPilotComponent);
    modal.result.then((pilot: Pilot) => {
      if (pilot) {
        const double = this.plane.pilots.find(item => item.id === pilot.id);
        if (!double) {
          this.plane.pilots.push(pilot);
          this.planeService.update(this.plane).subscribe(() => {
            this.pilotList = this.plane.pilots.length > 0 ? this.plane.pilots : [];
          });
        }
      }
    });
  }
  removePilot(pilot: Pilot) {
    this.plane.pilots = this.plane.pilots.filter(item => item.id !== pilot.id);
    this.planeService.update(this.plane).subscribe(() => {
      this.pilotList = this.plane.pilots.length > 0 ? this.plane.pilots : [];
    });
  }

}
