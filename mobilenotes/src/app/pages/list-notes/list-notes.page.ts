import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { RegisterNotePage } from '../register-note/register-note.page';
import { NoteDTO } from './../../model/noteDTO';
import { NoteService } from './../../services/note.service';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.page.html',
  styleUrls: ['./list-notes.page.scss']
})
export class ListNotesPage implements OnInit, OnDestroy {
  static pageName = 'list-notes';
  notesDTO: NoteDTO[] = [];
  loading: any;
  constructor(
    private noteService: NoteService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private zone: NgZone
  ) { }
  ngOnInit(): void {
    this.inicializarLista();
  }

  ngOnDestroy(): void {
    console.log('morreu a lista');
  }

  inicializarLista(refresher?: any) {
    from(this.presentLoading()).subscribe(() => this.findAllNotes(refresher));
  }

  findAllNotes(refresher?: any) {
    this.noteService.findAll().subscribe(
      notesDTO => {
        this.zone.run(() => (this.notesDTO = notesDTO));
        this.hideComponentLoading(refresher);
      },
      (err: HttpErrorResponse) => {
        this.hideComponentLoading(refresher);
        this.showMessageError('Falha ao consultar as notas');
      }
    );
  }

  findByTitle(searchBar?: any) {
    let title: string = searchBar.srcElement.value;
    if(title) {
      from(this.presentLoading()).subscribe(() => {
        this.noteService.findByTitle(title).subscribe(notesDTO => {
          this.zone.run(() => this.notesDTO = notesDTO);
          this.hideComponentLoading();
        }, (err: HttpErrorResponse) => {
          this.hideComponentLoading();
          this.showMessageError('Falha ao consultar as notas pelo título');
        });
      });
    } else {
      this.inicializarLista();
    }
  }

  hideComponentLoading(refresher?: any) {
    this.loading.dismiss();
    if (refresher) {
      refresher.target.complete();
    }
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

  registerNote() {
    this.router.navigate([`/${RegisterNotePage.pageName}`]);
  }

  updateNote(noteDTO: NoteDTO) {
    const id = noteDTO.id;
    this.router.navigate([`/${RegisterNotePage.pageName}/${id}`]);
  }

  deleteNote(id) {
    this.presentAlertConfirm(id);
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: '<strong>Confirma a exclusão da Nota?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => { }
        },
        {
          text: 'Ok',
          handler: () => {
            from(this.presentLoading()).subscribe(() => {
              this.noteService.delete(id).subscribe(
                data => {
                  this.loading.dismiss();
                  from(this.showMessageSucesss(data.message)).subscribe(() =>
                    this.inicializarLista()
                  );
                },
                (err: HttpErrorResponse) => {
                  this.loading.dismiss();
                  console.log(err);
                  this.showMessageError('Falha ao consultar as notas');
                }
              );
            });
          }
        }
      ]
    });

    await alert.present();
  }

  private async showMessageSucesss(message: string) {
    const alert = await this.alertController.create({
      header: 'Info',
      message: message,
      buttons: ['Ok']
    });
    return await alert.present();
  }
}
