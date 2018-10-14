import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { NoteService } from '../../services/note.service';
import { Location } from '@angular/common';
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
    private location: Location,
    private formBuilder: FormBuilder,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(noteDTO => {
      let id = '';
      let title = '';
      let description = '';
      if (noteDTO) {
        id = noteDTO.id;
        title = noteDTO.note.title;
        description = noteDTO.note.description;
      }
      this.noteDTOForm = new FormGroup({
        id: this.formBuilder.control(id),
        note: new FormGroup({
          title: this.formBuilder.control(title, [Validators.required]),
          description: this.formBuilder.control(description, [Validators.required])
        })
      });
    });
  }

  salvar() {
    const noteDTO = this.noteDTOForm.value;
    const note = noteDTO.note;
    from(this.presentLoading()).subscribe(() => {
      this.noteService.save(note).subscribe(
        message => {
          this.loading.dismiss();
          from(this.showMessageSucesss(message.message)).subscribe(() =>
            this.location.back()
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.loading.dismiss();
          this.showMessageError('Erro ao tentar cadastrar uma nota');
        }
      );
    });
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
    await alert.present();
  }

  private async showMessageSucesss(message: string) {
    const alert = await this.alertController.create({
      header: 'Info',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
