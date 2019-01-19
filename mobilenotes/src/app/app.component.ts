import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { ListNotesPage } from './pages/list-notes/list-notes.page';
import { RegisterNotePage } from './pages/register-note/register-note.page';
import { ListTransactionsPage } from './pages/list-transactions/list-transactions.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Notas',
      url: '/' + ListNotesPage.pageName,
      icon: 'book',
      typeNavigation: 'root'
    },
    {
      title: 'Cadastro de Notas',
      url: '/' + RegisterNotePage.pageName,
      icon: 'add-circle',
      typeNavigation: 'root'
    },
    {
      title: 'Transações',
      url: '/' + ListTransactionsPage.pageName,
      icon: 'cash',
      typeNavigation: 'root'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
