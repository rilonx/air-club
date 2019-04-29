import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from "@app/modules/auth/auth.routing";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent, RegisterComponent } from "@app/modules/auth/pages";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule { }
