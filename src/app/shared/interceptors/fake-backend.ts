import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Account } from '@app/core/models';
import { Airport, Plane, Pilot } from '@app/shared/models';
import { airports } from '@app/modules/airports/airports.json';
import { planes } from '@app/modules/planes/planes.json';
import { pilots } from '@app/modules/pilots/pilots.json';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  airports: Array<Airport> = airports;
  planes: Array<Plane> = planes;
  pilots: Array<Pilot> = pilots;
  users: Array<Account> = [];
  constructor() {
    this.users = [
      {
        username: 'Admin',
        token: 'Auth-Token',
        role: 'admin'
      },
      {
        username: 'User',
        token: 'Auth-Token',
        role: 'users'
      }
    ];
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      /////////////////////////
      //////// USER ///////////
      /////////////////////////
      if (request.url.endsWith('/accounts/login') && request.method === 'POST') {
        // find if any user matches login credentials
        const findUser = this.users.find((user: Account ) => {
          return user.username.toUpperCase() === request.body.username.toUpperCase();
        });
        if (findUser) {
          return of(new HttpResponse({ status: 200, body: findUser }));
        } else {
          // else return 400 bad request
          return throwError({ error: { message: 'Username or password is incorrect' } });
        }
      }

      /////////////////////////
      /////// AIRPORTS /////////
      /////////////////////////
      // GET
      if (request.url.endsWith('/airports') && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: this.getMethod(request, this.airports) }));
      }
      // GET
      if (request.url.match(/\/airports\/\d+$/) && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: this.getByIdMethod(request, this.airports) }));
      }
      // CREATE
      if (request.url.endsWith('/airports') && request.method === 'POST') {
        const newObj = this.createMethod(request, this.airports) as Airport;
        if (newObj) {
          newObj.planes = newObj.planes ? newObj.planes : [];
          newObj.pilots = newObj.pilots ? newObj.pilots : [];
          this.airports.push(newObj);
        }
        // respond 200 OK
        return of(new HttpResponse({status: 200}));
      }
      // UPDATE
      if (request.url.match(/\/airports\/\d+$/) && request.method === 'PUT') {
        const updateObj = this.updateMethod(request, this.airports);
        if (updateObj) {
          this.airports[updateObj.index] = updateObj.data;
          // respond 200 OK
          return of(new HttpResponse({status: 200}));
        } else {
          return throwError({error: {message: 'Объект не существует'}});
        }
      }
      // DELETE
      if (request.url.match(/\/airports\/\d+$/) && request.method === 'DELETE') {
        const deletedIndex = this.deleteMethod(request, this.airports);
        this.airports.splice(deletedIndex, 1);
        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
      }
      /////////////////////////
      /////// PLANES /////////
      /////////////////////////
      // GET
      if (request.url.endsWith('/planes') && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: this.getMethod(request, this.planes) }));
      }
      // GET BY ID
      if (request.url.match(/\/planes\/\d+$/) && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: this.getByIdMethod(request, this.planes) }));
      }
      // CREATE
      if (request.url.endsWith('/planes') && request.method === 'POST') {
        const newObj = this.createMethod(request, this.planes) as Plane;
        if (newObj) {
          newObj.pilots = newObj.pilots ? newObj.pilots : [];
          this.planes.push(newObj);
        }
        // respond 200 OK
        return of(new HttpResponse({status: 200}));
      }
      // UPDATE
      if (request.url.match(/\/planes\/\d+$/) && request.method === 'PUT') {
        const updateObj = this.updateMethod(request, this.planes);
        if (updateObj) {
          this.planes[updateObj.index] = updateObj.data;
          // respond 200 OK
          return of(new HttpResponse({status: 200}));
        } else {
          return throwError({error: {message: 'Объект не существует'}});
        }
      }
      // DELETE
      if (request.url.match(/\/planes\/\d+$/) && request.method === 'DELETE') {
        const deletedIndex = this.deleteMethod(request, this.planes);
        this.planes.splice(deletedIndex, 1);
        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
      }
      /////////////////////////
      /////// PILOTS /////////
      /////////////////////////
      // GET
      if (request.url.endsWith('/pilots') && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: this.getMethod(request, this.pilots) }));
      }
      // GET BY ID
      if (request.url.match(/\/pilots\/\d+$/) && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: this.getByIdMethod(request, this.pilots) }));
      }
      // CREATE
      if (request.url.endsWith('/pilots') && request.method === 'POST') {
        const newObj = this.createMethod(request, this.pilots);
        if (newObj) {
          this.pilots.push(newObj);
        }
        // respond 200 OK
        return of(new HttpResponse({status: 200}));
      }
      // UPDATE
      if (request.url.match(/\/pilots\/\d+$/) && request.method === 'PUT') {
        const updateObj = this.updateMethod(request, this.pilots);
        if (updateObj) {
          this.pilots[updateObj.index] = updateObj.data;
          // respond 200 OK
          return of(new HttpResponse({status: 200}));
        } else {
          return throwError({error: {message: 'Объект не существует'}});
        }
      }
      // DELETE
      if (request.url.match(/\/pilots\/\d+$/) && request.method === 'DELETE') {
        const deletedIndex = this.deleteMethod(request, this.pilots);
        this.pilots.splice(deletedIndex, 1);
        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
      }

      return next.handle(request);
    }))
      .pipe(materialize())
      .pipe(delay(300))
      .pipe(dematerialize());
  }

  private getMethod(request: HttpRequest<any>, collection: any[]) {
    return {
      data: this.filterCollectionByPage(request, collection),
      collectionSize: collection.length
    };
  }
  private getByIdMethod(request: HttpRequest<any>, collection: any[]) {
    const urlParts = request.url.split('/');
    const id = +(urlParts[urlParts.length - 1]);
    return collection.find(item => item.id === id) || null;
  }
  private createMethod(request: HttpRequest<any>, collection: any[]) {
    const newObj = request.body;
    // validation
    const duplicate = collection.find(item => item.code === newObj.code && item.name === item.name);
    if (duplicate) {
      return throwError({error: {message: 'Объект "' + newObj.name + '" Уже создан'}});
    }
    // save
    newObj.id = collection.length + 1;
    return newObj;
  }
  private updateMethod(request: HttpRequest<any>, collection: any[]): {index, data} {
    const updateObj = request.body;
    let result = {data: {}, index: 0};
    // validation
    const airportForUpdate = collection.find(item => item.id === updateObj.id);
    if (airportForUpdate) {
      // update
      const index = collection.indexOf(airportForUpdate);
      result.data = updateObj;
      result.index = index;
    } else {
      result = null;
    }
    return result;
  }
  private deleteMethod(request: HttpRequest<any>, collection: any[]) {
    const urlParts = request.url.split('/');
    const id = +(urlParts[urlParts.length - 1]);
    let deletedIndex = null;
    for (let i = 0; i < collection.length; i++) {
      const item = collection[i];
      if (item.id === id) {
        // delete airport
        deletedIndex = i;
        break;
      }
    }
    return deletedIndex;
  }
  private filterCollectionByPage(request, collection): any[] {
    const page = +request.params['page'];
    const pageSize = +request.params['pageSize'];
    let result;
    if (page && pageSize) {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      result = collection.reduce((acc, cur, index) => {
        if (index >= from && index <= to) {
          acc.push(cur);
        }
        return acc;
      }, []);
    } else {
      result = collection;
    }
    return result;
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
