import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { KycDTO } from '../models/kyc.model';

@Injectable({
  providedIn: 'root'
})
export class KycService {
  private apiUrl = `${environment.apiUrl}/kyc`;

  constructor(private http: HttpClient) { }

  saveKyc(kycDTO: KycDTO): Observable<KycDTO> {
    return this.http.post<KycDTO>(this.apiUrl, kycDTO)
      .pipe(catchError(this.handleError));
  }

  updateKyc(kycDTO: KycDTO): Observable<KycDTO> {
    return this.http.put<KycDTO>(`${this.apiUrl}/${kycDTO.id}`, kycDTO)
      .pipe(catchError(this.handleError));
  }

  deleteKyc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getKycById(id: number): Observable<KycDTO> {
    return this.http.get<KycDTO>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getAllKycs(): Observable<KycDTO[]> {
    return this.http.get<KycDTO[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  approveKyc(id: number): Observable<KycDTO> {
    return this.http.post<KycDTO>(`${this.apiUrl}/${id}/approve`, {})
      .pipe(catchError(this.handleError));
  }

  rejectKyc(id: number): Observable<KycDTO> {
    return this.http.post<KycDTO>(`${this.apiUrl}/${id}/reject`, {})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
