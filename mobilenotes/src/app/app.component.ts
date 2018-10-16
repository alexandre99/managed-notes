import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RegisterNotePage } from './pages/register-note/register-note.page';
import { HomePage } from './pages/home/home.page';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Notas',
      url: '/' + HomePage.pageName,
      icon: 'book'
    },
    {
      title: 'Cadastro de Notas',
      url: '/' + RegisterNotePage.pageName,
      icon: 'add-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public push: Push,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  pushsetup() {
    const options: PushOptions = {};

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((registration: any) => {});

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        this.showMessageSucesss(notification.label, notification.message);
      }
    });

  }
    private async showMessageSucesss(title: string, message: string) {
      const alert = await this.alertController.create({
        header: title,
        message: message,
        buttons: ['Ok']
      });
      return await alert.present();
    }
}
