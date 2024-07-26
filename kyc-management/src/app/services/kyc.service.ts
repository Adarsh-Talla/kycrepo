import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { KycDTO } from '../models/kyc.model';

@Injectable({
  providedIn: 'root'
})
export class KycService {
  private apiUrl = `${environment.apiUrl}/kyc`;

  constructor(private http: HttpClient) { }

  saveKyc(kycDTO: KycDTO): Observable<KycDTO> {
    return this.http.post<KycDTO>(this.apiUrl, kycDTO);
  }

  updateKyc(kycDTO: KycDTO): Observable<KycDTO> {
    return this.http.put<KycDTO>(`${this.apiUrl}/${kycDTO.id}`, kycDTO);
  }

  deleteKyc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getKycById(id: number): Observable<KycDTO> {
    return this.http.get<KycDTO>(`${this.apiUrl}/${id}`);
  }

  getAllKycs(): Observable<KycDTO[]> {
    return this.http.get<KycDTO[]>(this.apiUrl);
  }

  approveKyc(id: number): Observable<KycDTO> {
    return this.http.post<KycDTO>(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectKyc(id: number): Observable<KycDTO> {
    return this.http.post<KycDTO>(`${this.apiUrl}/${id}/reject`, {});
  }
}