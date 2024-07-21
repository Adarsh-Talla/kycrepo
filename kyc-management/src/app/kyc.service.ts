import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Kyc, KycStatus } from './models/kyc.model';

@Injectable({
  providedIn: 'root'
})
export class KycService {
  private apiUrl = 'http://localhost:8080/api/kycs'; // Base URL for the API

  constructor(private http: HttpClient) {}

  createKyc(kyc: Kyc): Observable<Kyc> {
    return this.http.post<Kyc>(this.apiUrl, kyc).pipe(
      catchError(this.handleError<Kyc>('createKyc'))
    );
  }

  getKycForUser(): Observable<Kyc[]> {
    return this.http.get<Kyc[]>(`${this.apiUrl}/user`).pipe(
      catchError(this.handleError<Kyc[]>('getKycForUser', []))
    );
  }

  getAllKyc(): Observable<Kyc[]> {
    return this.http.get<Kyc[]>(this.apiUrl).pipe(
      catchError(this.handleError<Kyc[]>('getAllKyc', []))
    );
  }

  getKycById(id: number): Observable<Kyc> {
    return this.http.get<Kyc>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Kyc>('getKycById'))
    );
  }

  updateKyc(id: number, kyc: Kyc): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, kyc).pipe(
      catchError(this.handleError<void>('updateKyc'))
    );
  }

  updateKycStatus(id: number, status: KycStatus): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      catchError(this.handleError<void>('updateKycStatus'))
    );
  }

  deleteKyc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<void>('deleteKyc'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
