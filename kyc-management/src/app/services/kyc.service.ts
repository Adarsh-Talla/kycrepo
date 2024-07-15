import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KycDTO } from '../models/kyc.model';

@Injectable({
  providedIn: 'root'
})
export class KycService {
  private apiUrl = 'http://localhost:8080/api/kyc';

  constructor(private http: HttpClient) {}

  getKycs(): Observable<KycDTO[]> {
    return this.http.get<KycDTO[]>(this.apiUrl);
  }

  getKyc(id: number): Observable<KycDTO> {
    return this.http.get<KycDTO>(`${this.apiUrl}/${id}`);
  }

  createKyc(kyc: KycDTO): Observable<KycDTO> {
    return this.http.post<KycDTO>(this.apiUrl, kyc);
  }

  updateKyc(kyc: KycDTO): Observable<KycDTO> {
    return this.http.put<KycDTO>(this.apiUrl, kyc);
  }

  deleteKyc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
