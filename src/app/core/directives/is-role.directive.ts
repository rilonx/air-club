import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from "@app/core/services";
import {Account} from "@app/core/models";

@Directive({
  selector: '[isRole]'
})
export class IsRoleDirective {

  private _roles: string[];
  private user: Account;

  @Input('isRole') set roles(roles: string[]) {
    this._roles = roles;
    this.setViewContainer();
  }

  get roles() {
    return this._roles;
  }

  constructor(
    private template: TemplateRef<object>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(this.onChangeUser.bind(this));
  }

  private onChangeUser(user): void {
    this.user = user;
    this.setViewContainer();
  }

  private setViewContainer() {
    if (this.user && this.roles) {
      const isShow = this.authService.matchRole(this.roles);
      isShow ? this.viewContainer.createEmbeddedView(this.template) : this.viewContainer.clear();
    }
    else {
      this.viewContainer.clear();
    }
  }

}
