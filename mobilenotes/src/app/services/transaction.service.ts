import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionDTO } from '../model/transactionDTO';
import { URL_API } from '../app.api';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<TransactionDTO[]> {
    return this.http.get<TransactionDTO[]>(`${URL_API}/transaction`);
  }

  save(transaction: Transaction): Observable<any> {
    return this.http.post<any>(`${URL_API}/transaction`, transaction);
  }

  findById(id: string): Observable<TransactionDTO> {
    return this.http.get<TransactionDTO>(`${URL_API}/transaction/${id}/id`);
  }

  update(TransactionDTO: TransactionDTO): Observable<any> {
    return this.http.put<any>(`${URL_API}/transaction`, TransactionDTO);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${URL_API}/transaction/${id}`);
  }
}
