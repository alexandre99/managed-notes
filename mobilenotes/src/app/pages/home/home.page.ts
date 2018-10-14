import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController
} from '@ionic/angular';
import { from } from 'rxjs';
import { NoteDTO } from './../../model/noteDTO';
import { NoteService } from './../../services/note.service';
import { RegisterNotePage } from './../register-note/register-note.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  static pageName = 'home';
  notesDTO: NoteDTO[];
  loading: any;
  constructor(
    private noteService: NoteService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    from(this.presentLoading()).subscribe(() => this.findAllNotes());
  }

  findAllNotes() {
    this.noteService.findAll().subscribe(
      notesDTO => {
        this.notesDTO = notesDTO;
        this.loading.dismiss();
      },
      (err: HttpErrorResponse) => {
        this.loading.dismiss();
        this.showMessageError(err.message);
      }
    );
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
    this.navCtrl.navigateForward('register-note');
  }
}
