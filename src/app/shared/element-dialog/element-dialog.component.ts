import { Component, Inject, AfterViewInit, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/notesServices';
import { Note } from 'src/app/models/note';
import { AppComponent } from 'src/app/app.component';
import { MatList, MatListItem, MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import * as $ from 'jquery';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementDialogComponent implements OnInit {
  name!: string
  notes!: Note[]
  divSalvar!: HTMLDivElement
  @ViewChild(MatSelectionList)
  listNotes!: MatSelectionList
  @ViewChild(MatListOption)
  selectedNote!: MatListOption
  divAbrir!:HTMLDivElement

  constructor(
    @Inject(MAT_DIALOG_DATA)
     public data: Note[],
    public dialogRef: 
    MatDialogRef<ElementDialogComponent>,
    public noteService: NoteService
    ) { }

  ngOnInit(): void {
    if(this.data[0].id = null){

    }
   }

  abrirNota(){
    let a = this.listNotes.selectedOptions.selected[0]?.value
    let note = this.data.find(p=>p.id === a.id)
    this.dialogRef.close(note);
  }

  salvarNota(){

  }

  cancel(){
    this.dialogRef.close()
  }

}
