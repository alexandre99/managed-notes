import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from './../app.api';
import { Note } from './../model/note';
import { NoteDTO } from './../model/noteDTO';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private http: HttpClient) { }

  findAll(): Observable<NoteDTO[]> {
    return this.http.get<NoteDTO[]>(`${URL_API}/notes`);
  }

  save(note: Note): Observable<any> {
    return this.http.post<any>(`${URL_API}/notes`, note);
  }

  findById(id: string): Observable<NoteDTO> {
    return this.http.get<NoteDTO>(`${URL_API}/notes/${id}/id`);
  }

  findByTitle(title: string): Observable<NoteDTO[]> {
    return this.http.get<NoteDTO[]>(`${URL_API}/notes/${title}/title`);
  }

  update(noteDTO: NoteDTO): Observable<any> {
    return this.http.put<any>(`${URL_API}/notes`, noteDTO);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${URL_API}/notes/${id}`);
  }
}
