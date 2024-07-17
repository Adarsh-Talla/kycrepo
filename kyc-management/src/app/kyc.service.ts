import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kyc } from './models/kyc.model';

@Injectable({
  providedIn: 'root'
})
export class KycService {
  private baseUrl = 'http://localhost:8080/api/kyc';

  constructor(private http: HttpClient) { }

  getKycs(): Observable<Kyc[]> {
    return this.http.get<Kyc[]>(`${this.baseUrl}`);
  }

  createKyc(kyc: Kyc): Observable<Kyc> {
    return this.http.post<Kyc>(`${this.baseUrl}`, kyc);
  }

  getKycById(id: number): Observable<Kyc> {
    return this.http.get<Kyc>(`${this.baseUrl}/${id}`);
  }

  updateKyc(id: number, kyc: Kyc): Observable<Kyc> {
    return this.http.put<Kyc>(`${this.baseUrl}/${kyc.id}`, kyc);
  }

  updateKycStatus(id: number, status: string): Observable<Kyc> {
    return this.http.put<Kyc>(`${this.baseUrl}/${id}/status`, { status });
  }

  deleteKyc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
