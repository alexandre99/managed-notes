import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from './../app.api';
import { NoteDTO } from './../model/noteDTO';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<NoteDTO[]> {
    return this.http.get<NoteDTO[]>(`${URL_API}/notes`);
  }
}
