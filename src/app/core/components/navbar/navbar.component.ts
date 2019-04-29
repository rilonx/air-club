import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Account, MenuItem } from "@app/core/models";
import { MenuService } from "@app/core/services";

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() user: Account;
  @Output('logout') event: EventEmitter<null> = new EventEmitter();
  menuItems: Array<MenuItem>;

  constructor(
    private router: Router,
    private menuService: MenuService
  ) {
    this.menuService.items.subscribe((items: MenuItem[]) => this.menuItems = items);
  }

  ngOnInit() {}

  onLogout() {
    this.event.emit(null);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  markActiveItem(item: MenuItem) {
    return this.router.url === item.route ? 'active' : '';
  }

}
