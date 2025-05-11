import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee, OffboardEmployeeQuery } from './employees.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApi {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/employees`;

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl);
  }

  getEmployee(id: string): Observable<Employee | undefined> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`);
  }

  offboard(query: OffboardEmployeeQuery): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.baseUrl}/${query.id}/offboard`, query);
  }
}
