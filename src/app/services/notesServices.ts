import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable()
export class NoteService{
    data = {}
    httpOptions = {headers: 
        new HttpHeaders({"Content-Type":"application/json"})}
    apiUrl = 'https://localhost:7058/api/Notes'

    constructor(private http:HttpClient){}

    async getNotes(): Promise<Observable<Note[]>>{
        return await this.http.get<Note[]>(this.apiUrl)
    }

    createNote(note: Note): Observable<Note>{
        return this.http.post<Note>(this.apiUrl, note)
    }

    editNote(note: Note){
        this.http.put<Note>(this.apiUrl, note).subscribe({
            next: data => {  },
            error: error => { console.log(error) }
        })
    }

    deleteNote(id: number): Observable<Note>{
        return this.http.delete<Note>(`${this.apiUrl}?id=${id}`)
    }
}