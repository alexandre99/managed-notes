import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { NoteDTO } from '../../model/noteDTO';
import { NoteService } from '../../services/note.service';
import { Note } from './../../model/note';
@Component({
  selector: 'app-register-note',
  templateUrl: './register-note.page.html',
  styleUrls: ['./register-note.page.scss']
})
export class RegisterNotePage implements OnInit {
  static pageName = 'register-note';
  noteDTOForm: FormGroup;
  loading: any;
  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private noteService: NoteService
  ) { }

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    this.initFormGroup();
    if (id) {
      this.loadingNoteForUpdate(id);
    }
  }

  private loadingNoteForUpdate(id: string) {
    from(this.presentLoading()).subscribe(() =>
      this.noteService.findById(id).subscribe(noteDTO => {
        this.loading.dismiss();
        this.noteDTOForm.setValue(noteDTO);
      })
    );
  }

  private initFormGroup() {
    this.noteDTOForm = new FormGroup({
      id: this.formBuilder.control(''),
      note: new FormGroup({
        title: this.formBuilder.control('', [Validators.required]),
        description: this.formBuilder.control('', [Validators.required])
      })
    });
  }

  saveOrUpdate() {
    const noteDTO = this.noteDTOForm.value;
    const note = noteDTO.note;
    from(this.presentLoading()).subscribe(() => {
      if (!noteDTO.id) {
        this.save(note);
      } else {
        this.update(noteDTO);
      }
    });
  }

  private update(noteDTO: NoteDTO) {
    this.noteService
      .update(noteDTO)
      .subscribe(
        data => this.callBackSaveSuccess(data.message),
        (error: HttpErrorResponse) =>
          this.callBackSaveError(error, 'Erro ao tentar atualizar nota')
      );
  }

  private save(note: Note) {
    this.noteService
      .save(note)
      .subscribe(
        data => this.callBackSaveSuccess(data.message),
        (error: HttpErrorResponse) =>
          this.callBackSaveError(error, 'Erro ao tentar salvar nota')
      );
  }

  private callBackSaveError(error, message) {
    console.log(error);
    this.loading.dismiss();
    this.showMessageError(message);
  }

  private callBackSaveSuccess(message) {
    this.loading.dismiss();
    from(this.showMessageSucess(message)).subscribe(() => this.location.back());
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde...'
    });
    return await this.loading.present();
  }

  private async showMessageError(message: string) {
    const alert = await this.alertController.create({
      header: 'Falha',
      message: message,
      buttons: ['Ok']
    });
    return await alert.present();
  }

  private async showMessageSucess(message: string) {
    const alert = await this.alertController.create({
      header: 'Info',
      message: message,
      buttons: ['Ok']
    });
    return await alert.present();
  }
}
