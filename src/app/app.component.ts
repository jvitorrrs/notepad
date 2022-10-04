import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { toArray } from 'rxjs';
import { Note } from './models/note';
import { NoteService } from './services/notesServices';
import { ElementDialogComponent } from './shared/element-dialog/element-dialog.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MatDialog, ElementDialogComponent]
})
export class AppComponent {
  id?:number
  text!: string
  title!: string
  verify = false
  notes: any
  note!:Note

  constructor(public dialog:MatDialog,
    public dialogComponent: ElementDialogComponent,
    public noteService:NoteService,
    public notify: MatSnackBar
    ) {}

    async ngOnInit() {
    }
  
   async get(){
    (await this.noteService
      .getNotes()).subscribe(result=>{
      this.notes = result
    })
    const dialogRef = this.dialog
    .open(ElementDialogComponent, {
      data: this.notes
    })

    dialogRef.afterClosed().subscribe(result=>{
      this.text = result.texto
      this.title = result.name
      this.id = result.id
    })
  }

  saveNote(){
    if(this.id != null){
      this.note = {
        id:this.id,
        name:this.title,
        texto:this.text
      }
      this.noteService.editNote(this.note)
      this.notify.open(this.note.name+' Salvo', 'Fechar')
    }
    this.note = {
      id: null,
      name: '',
      texto:this.text
    }
    this.dialog.open(ElementDialogComponent, {
      data:this.note
    })
    this.noteService.createNote(this.note)
  }
}
