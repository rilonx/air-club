import { Injectable } from '@angular/core';
import { MenuItem } from '@app/core/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '@app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _items: MenuItem[] = [];
  private subject: BehaviorSubject<Array<MenuItem>>;
  public items: Observable<Array<MenuItem>>;

  constructor(
    private authService: AuthService
  ) {
    this.subject = new BehaviorSubject([]);
    this.items = this.subject.asObservable();
  }

  // PUBLIC METHODS //

  addItem(item: MenuItem): void  {
    const isUnique = this._items.every((_item: MenuItem) => _item.text !== item.text);
    const allowedRole = this.checkRole(item);
    if (isUnique && allowedRole) {
      this._items.push(item);
      this.sort();
      this.subject.next(this._items);
    }
  }

  addItems(items: MenuItem[]): void {
    // Фильтруем по роли
    this._items = items.filter((item: MenuItem) => this.checkRole(item));
    this.sort();
    this.subject.next(this._items);
  }

  // PRIVATE METHODS //

  private sort(): void {
    this._items.sort((itemA: MenuItem, itemB: MenuItem) => {
      if (itemA.order < itemB.order) {
        return -1;
      }
      if (itemA.order > itemB.order) {
        return 1;
      }
      return 0;
    });
  }

  private checkRole(item: MenuItem): boolean {
    return this.authService.matchRole(item.roles);
  }

}
