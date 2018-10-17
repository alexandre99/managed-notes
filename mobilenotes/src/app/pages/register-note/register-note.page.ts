import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { NoteService } from '../../services/note.service';
@Component({
  selector: 'app-register-note',
  templateUrl: './register-note.page.html',
  styleUrls: ['./register-note.page.scss']
})
export class RegisterNotePage implements OnInit, OnDestroy {
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
  ) {}

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    this.iniciarFormGroup();
    if (id) {
      from(this.presentLoading()).subscribe(() =>
        this.noteService.findById(id).subscribe(noteDTO => {
          this.loading.dismiss();
          this.noteDTOForm.setValue(noteDTO);
        })
      );
    }
  }

  ngOnDestroy(): void {
    console.log('morreu register note');
   }
 

  private iniciarFormGroup() {
    this.noteDTOForm = new FormGroup({
      id: this.formBuilder.control(''),
      note: new FormGroup({
        title: this.formBuilder.control('', [Validators.required]),
        description: this.formBuilder.control('', [Validators.required])
      })
    });
  }

  salvar() {
    const noteDTO = this.noteDTOForm.value;
    const note = noteDTO.note;
    from(this.presentLoading()).subscribe(() => {
      if (!noteDTO.id) {
        this.noteService
          .save(note)
          .subscribe(
            data => this.callBackSaveSuccess(data.message),
            (error: HttpErrorResponse) =>
              this.callBackSaveError(error, 'Erro ao tentar salvar nota')
          );
      } else {
        this.noteService
          .update(noteDTO)
          .subscribe(
            data => this.callBackSaveSuccess(data.message),
            (error: HttpErrorResponse) =>
              this.callBackSaveError(error, 'Erro ao tentar atualizar nota')
          );
      }
    });
  }

  private callBackSaveError(error, message) {
    console.log(error);
    this.loading.dismiss();
    this.showMessageError(message);
  }

  private callBackSaveSuccess(message) {
    this.loading.dismiss();
    from(this.showMessageSucess(message)).subscribe(() =>  this.location.back());
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
