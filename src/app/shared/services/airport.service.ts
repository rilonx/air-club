import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airport, IResponse, PageFilter } from '@app/shared/models';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(
    private http: HttpClient
  ) {}

  get(filter: PageFilter): Observable<IResponse<Airport>> {
    const obj = new HttpParams();
    for (const index in filter) {
      obj[index] = '' + filter[index];
    }
    return this.http.get<IResponse<Airport>>(`${environment.apiUrl}/airports`, { params: obj }).pipe(map(response => {
      return response;
    }));
  }

  getById(id: number) {
    return this.http.get<Airport>(`${environment.apiUrl}/airports/${id}`);
  }

  create(airport: Airport) {
    return this.http.post(`${environment.apiUrl}/airports`, airport);
  }

  update(airport: Airport) {
    return this.http.put(`${environment.apiUrl}/airports/${airport.id}`, airport);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/airports/${id}`);
  }
}
