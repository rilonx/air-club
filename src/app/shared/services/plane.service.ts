import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse, PageFilter, Plane } from '@app/shared/models';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {

  constructor(
    private http: HttpClient
  ) {}

  get(filter?: PageFilter): Observable<IResponse<Plane>> {
    const obj = new HttpParams();
    for (const index in filter) {
      obj[index] = '' + filter[index];
    }
    return this.http.get<IResponse<Plane>>(`${environment.apiUrl}/planes`, { params: obj }).pipe(map(response => {
      return response;
    }));
  }

  getById(id: number): Observable<Plane> {
    return this.http.get<Plane>(`${environment.apiUrl}/planes/${id}`);
  }

  create(plane: Plane) {
    return this.http.post(`${environment.apiUrl}/planes`, plane);
  }

  update(plane: Plane) {
    return this.http.put(`${environment.apiUrl}/planes/${plane.id}`, plane);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/planes/${id}`);
  }
}
