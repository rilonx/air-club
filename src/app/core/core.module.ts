import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@app/core/components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@app/core/services/auth.service';
import { AlertComponent } from './components/alert/alert.component';
import { IsAuthDirective } from './directives/is-auth.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFieldComponent } from './components/dynamic-field/dynamic-field.component';
import {ReactiveFormsModule} from '@angular/forms';
import { IsRoleDirective } from './directives/is-role.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    AlertComponent,
    IsAuthDirective,
    DynamicFormComponent,
    DynamicFieldComponent,
    IsRoleDirective
  ],
  providers: [
    AuthService
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    NgbModule,
    NavbarComponent,
    AlertComponent,
    IsAuthDirective,
    IsRoleDirective,
    DynamicFormComponent,
    DynamicFieldComponent
  ]
})
export class CoreModule { }
