import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormField } from '@app/shared/models/form-field';
import { Operations } from '@app/shared/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pilot } from '@app/shared/models';
import { PilotService } from '@app/shared/services/pilot.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit {
  pilot: Pilot;
  pilotFields: FormField[];
  operation: Operations;
  errorMessage: string;
  Operations = Operations;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pilotService: PilotService,
    private modalService: NgbModal
  ) {
    this.pilotFields = [
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
        name: 'number',
        type: 'text',
        label: 'Номер',
        isId: false,
        validators: [Validators.required]
      },
      {
        name: 'fio',
        type: 'text',
        label: 'ФИО',
        isId: false,
        validators: [Validators.required]
      },
      {
        name: 'address',
        type: 'text',
        label: 'Адрес',
        isId: false,
        validators: [Validators.required]
      }
    ];
  }
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.operation = (+params['operation'] as Operations);
      if (this.operation === Operations.create) {
        this.pilot = {
          id: 0,
          code: '',
          number: '',
          fio: '',
          address: ''
        };
      } else {
        this.pilotService.getById(params['id'])
          .subscribe((pilot: Pilot ) => (this.pilot = pilot));
      }
    });
  }

  create(pilot: Pilot) {
    this.pilotService.create(pilot).subscribe(response => {
      this.router.navigate(['pilots']);
    });
  }
  update(pilot: Pilot) {
    this.pilotService.update(pilot).subscribe(response => {
      this.router.navigate(['pilots']);
    });
  }
}
