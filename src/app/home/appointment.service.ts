import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<any[]> {
    return this.http.get<any>(`${environment.API_URL}`);
  }

  cancelAppointment(id): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/${id}`);
  }
  createAppointment(appointmentDate: string, name: string, email: string): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}`,{ appointmentDate, name, email });
  }
}
