import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IRequest, IResponse } from '@app/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http: HttpClient
  ) { }

  get(request: IRequest): Observable<IResponse<any>> {
    const params = new HttpParams();
    for (const index in request.params) {
      params[index] = '' + request.params[index];
    }
    return this.http.get<IResponse<any>>(environment.apiUrl + request.url, { params: params }).pipe(map(response => {
      return response;
    }));
  }

  getById(request: IRequest) {
    return this.http.get<any>(`${environment.apiUrl + request.url}/${request.params.id}`);
  }

  create(request: IRequest) {
    return this.http.post(environment.apiUrl + request.url, request.data);
  }

  update(request: IRequest) {
    return this.http.put(`${environment.apiUrl + request.url}/${request.params.id}`, request.data);
  }

  delete(request: IRequest) {
    return this.http.delete(`${environment.apiUrl + request.url}/${request.params.id}`);
  }
}
