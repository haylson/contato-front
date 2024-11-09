import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Contato> {
    return this.http.get<Contato>(`${API_CONFIG.baseUrl}/contatos/${id}`);
  }

  findAll(): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${API_CONFIG.baseUrl}/contatos`);
  }

  create(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(`${API_CONFIG.baseUrl}/contatos`, contato);
  }

  update(contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${API_CONFIG.baseUrl}/contatos/${contato.id}`, contato);
  }

  delete(id: any): Observable<Contato> {
    return this.http.delete<Contato>(`${API_CONFIG.baseUrl}/contatos/${id}`);
  }

}
