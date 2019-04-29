import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormField } from '@app/shared/models/form-field';
import { Operations } from '@app/shared/enums';
import {Airport, Pilot, Plane} from '@app/shared/models';
import { AirportService } from '@app/shared/services/airport.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectPlaneComponent } from '@app/shared/components/select-plane/select-plane.component';
import {SelectPilotComponent} from '@app/shared/components/select-pilot/select-pilot.component';

@Component({
  selector: 'airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {
  airport: Airport;
  planeList: Plane[] = [];
  pilotList: Pilot[] = [];
  airportFields: FormField[];
  operation: Operations;
  errorMessage: string;
  Operations = Operations;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private airportService: AirportService,
    private modalService: NgbModal
  ) {
    this.airportFields = [
      {
        name: 'id',
        type: 'number',
        label: 'Id',
        isId: true,
        required: false
      },
      {
        name: 'code',
        type: 'text',
        label: 'Код',
        isId: false,
        required: true
      },
      {
        name: 'name',
        type: 'text',
        label: 'Наименование',
        isId: false,
        required: true
      },
      {
        name: 'address',
        type: 'text',
        label: 'Адрес',
        isId: false,
        required: true
      }
    ];
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.operation = (+params['operation'] as Operations);
      if (this.operation === Operations.create) {
        this.airport = {
          id: 0,
          code: '',
          name: '',
          address: '',
          planes: [],
          pilots: []
        };
      } else {
        this.airportService.getById(params['id'])
          .subscribe((airport: Airport ) => {
            this.airport = airport;
            this.planeList = (airport && airport.planes && airport.planes.length > 0) ? airport.planes : [];
            this.pilotList = (airport && airport.pilots && airport.pilots.length > 0) ? airport.pilots : [];
          });
      }
    });
  }

  create(airport: Airport) {
    this.airportService.create(airport).subscribe(response => {
      this.router.navigate(['airports']);
    });
  }
  update(airport: Airport) {
    this.airportService.update(airport).subscribe(response => {
      this.router.navigate(['airports']);
    });
  }
  addPlane() {
    const modal = this.modalService.open(SelectPlaneComponent);
    modal.result.then((plane: Plane) => {
      if (plane) {
        const double = this.airport.planes.find(item => item.id === plane.id);
        if (!double) {
          this.airport.planes.push(plane);
          this.airportService.update(this.airport).subscribe(() => {
            this.planeList = this.airport.planes.length > 0 ? this.airport.planes : [];
          });
        }
      }
    });
  }
  removePlane(plane: Plane) {
    this.airport.planes = this.airport.planes.filter(item => item.id !== plane.id);
    this.airportService.update(this.airport).subscribe(() => {
      this.planeList = this.airport.planes.length > 0 ? this.airport.planes : [];
    });
  }
  addPilot() {
    const modal = this.modalService.open(SelectPilotComponent);
    modal.result.then((pilot: Pilot) => {
      if (pilot) {
        const double = this.airport.pilots.find(item => item.id === pilot.id);
        if (!double) {
          this.airport.pilots.push(pilot);
          this.airportService.update(this.airport).subscribe(() => {
            this.pilotList = this.airport.pilots.length > 0 ? this.airport.pilots : [];
          });
        }
      }
    });
  }
  removePilot(pilot: Pilot) {
    this.airport.pilots = this.airport.pilots.filter(item => item.id !== pilot.id);
    this.airportService.update(this.airport).subscribe(() => {
      this.pilotList = this.airport.pilots.length > 0 ? this.airport.pilots : [];
    });
  }

}
