import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from "@app/core/services";

// Структурная директива показывает блок только для авторизованных пользователей

@Directive({
  selector: '[isAuth]'
})
export class IsAuthDirective {

  constructor(
    private template: TemplateRef<object>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(this.onChangeUser.bind(this));
  }

  onChangeUser(user): void {
    user ? this.viewContainer.createEmbeddedView(this.template) : this.viewContainer.clear();
  }

}
