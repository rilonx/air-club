import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from '@app/shared/interceptors/fake-backend';

import { CoreModule } from '@app/core/core.module';
import { AirportsModule } from '@app/modules/airports/airports.module';
import { PlanesModule } from '@app/modules/planes/planes.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { PilotsModule } from '@app/modules/pilots/pilots.module';

import { AppComponent } from './app.component';

import { ErrorInterceptor, JwtInterceptor } from '@app/core/interceptors';
import { AppRoutingModule } from '@app/app.routing';
import { SharedModule } from '@app/shared/shared.mosule';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AirportsModule,
    PlanesModule,
    PilotsModule,
    AuthModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    fakeBackendProvider, // remove for production
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
