import { Component, OnInit } from '@angular/core';
import {Airport, IResponse, PageFilter} from '@app/shared/models';
import { Operations } from '@app/shared/enums';
import { Router } from '@angular/router';
import { AirportService } from '@app/shared/services/airport.service';

@Component({
  selector: 'airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {
  public list: Airport[] = [];
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
    private airportService: AirportService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.airportService.get(this.filter).subscribe(response => {
      this.list = response.data;
      this.collectionSize = response.collectionSize;
    });
  }

  display(airport: Airport) {
    this.router.navigate([`airport`, airport.id, Operations.read]);
  }
  add() {
    this.router.navigate(['airport', 0, Operations.create]);
  }
  edit(airport: Airport) {
    this.router.navigate([`airport`, airport.id, Operations.edit]);
  }
  remove(airport: Airport) {
    this.isRemoving = true;
    this.airportService.delete(airport.id).subscribe(() => {
      this.isRemoving = false;
      this.getList();
    });
  }

  removeQuestion(airport: Airport) {
    this.removeError = null;
    this.removeId = airport.id;
  }

  cancelRemove() {
    this.isRemoving = false;
    this.removeId = null;
  }
}
