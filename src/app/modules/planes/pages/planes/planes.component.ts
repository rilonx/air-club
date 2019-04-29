import { Component, OnInit } from '@angular/core';
import { Airport, IResponse, PageFilter, Plane } from '@app/shared/models';
import { Operations } from '@app/shared/enums';
import { Router } from '@angular/router';
import { PlaneService } from '@app/shared/services';

@Component({
  selector: 'planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  public list: Plane[] = [];
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
    private planeService: PlaneService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.planeService.get(this.filter).subscribe(response => {
      this.list = response.data;
      this.collectionSize = response.collectionSize;
    });
  }

  display(plane: Plane) {
    this.router.navigate([`plane`, plane.id, Operations.read]);
  }
  add() {
    this.router.navigate(['plane', 0, Operations.create]);
  }
  edit(plane: Plane) {
    this.router.navigate([`plane`, plane.id, Operations.edit]);
  }
  remove(plane: Plane) {
    this.isRemoving = true;
    this.planeService.delete(plane.id).subscribe(() => {
      this.isRemoving = false;
      this.getList();
    });
  }

  removeQuestion(plane: Plane) {
    this.removeError = null;
    this.removeId = plane.id;
  }

  cancelRemove() {
    this.isRemoving = false;
    this.removeId = null;
  }

  markGreen(plane: Plane) {
    return plane.code.match('A') ? 'row_green' : '';
  }
}
