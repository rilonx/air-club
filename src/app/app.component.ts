import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, MenuService } from "@app/core/services";
import { Account } from "@app/core/models";
import { AppMenuItems } from "@app/app.menu";

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  currentUser: Account;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private menuService: MenuService
  ) {
    this.authenticationService.currentUser.subscribe((user: Account) => {
      this.currentUser = user;
      if (user) {
        this.menuService.addItems(AppMenuItems);
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
