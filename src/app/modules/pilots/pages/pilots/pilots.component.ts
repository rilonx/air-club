import { Component, OnInit } from '@angular/core';
import { Airport, IResponse, PageFilter, Plane, Pilot } from '@app/shared/models';
import { Operations } from '@app/shared/enums';
import { Router } from '@angular/router';
import { PilotService } from '@app/shared/services';

@Component({
  selector: 'pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.css']
})
export class PilotsComponent implements OnInit {
  public list: Pilot[] = [];
  private removeId: (number|null) = null;
  private isRemoving = false;
  private removeError: string;
  private Operations = Operations;
  private filter: PageFilter = {
    page: 1,
    pageSize: 10
  };
  private set page(val: number) {
    this.filter.page = val;
    this.getList();
  }
  private set pageSize(val: number) {
    this.filter.pageSize = val;
    this.getList();
  }
  private get page() {
    return this.filter.page;
  }
  private get pageSize() {
    return this.filter.pageSize;
  }
  private collectionSize = this.pageSize;
  constructor(
    private router: Router,
    private pilotService: PilotService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.pilotService.get(this.filter).subscribe(response => {
      this.list = response.data;
      this.collectionSize = response.collectionSize;
    });
  }

  display(pilot: Pilot) {
    this.router.navigate([`pilot`, pilot.id, Operations.read]);
  }
  add() {
    this.router.navigate(['pilot', 0, Operations.create]);
  }
  edit(pilot: Pilot) {
    this.router.navigate([`pilot`, pilot.id, Operations.edit]);
  }
  remove(pilot: Pilot) {
    this.isRemoving = true;
    this.pilotService.delete(pilot.id).subscribe(() => {
      this.isRemoving = false;
      this.getList();
    });
  }

  removeQuestion(pilot: Pilot) {
    this.removeError = null;
    this.removeId = pilot.id;
  }

  cancelRemove() {
    this.isRemoving = false;
    this.removeId = null;
  }
}
