import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse, PageFilter, Pilot } from '@app/shared/models';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PilotService {

  constructor(
    private http: HttpClient
  ) {}

  get(filter?: PageFilter): Observable<IResponse<Pilot>> {
    const obj = new HttpParams();
    for (const index in filter) {
      obj[index] = '' + filter[index];
    }
    return this.http.get<IResponse<Pilot>>(`${environment.apiUrl}/pilots`, { params: obj }).pipe(map(response => {
      return response;
    }));
  }

  getById(id: number): Observable<Pilot> {
    return this.http.get<Pilot>(`${environment.apiUrl}/pilots/${id}`);
  }

  create(pilot: Pilot) {
    return this.http.post(`${environment.apiUrl}/pilots`, pilot);
  }

  update(pilot: Pilot) {
    return this.http.put(`${environment.apiUrl}/pilots/${pilot.id}`, pilot);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/pilots/${id}`);
  }
}
