import { Component, OnInit, NgZone } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { TransactionDTO } from '../../model/transactionDTO';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.page.html',
  styleUrls: ['./list-transactions.page.scss'],
})
export class ListTransactionsPage implements OnInit {
  static pageName = 'list-transactions';
  transactionsDTO: TransactionDTO[] = [];
  private loading: any;
  constructor(
    private transactionService: TransactionService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private zone: NgZone) { }

  ngOnInit(): void {
    this.inicializarLista();
  }

  inicializarLista(refresher?: any) {
    from(this.presentLoading()).subscribe(() => this.findAllTransactions(refresher));
  }

  findAllTransactions(refresher?: any) {
    this.transactionService.findAll().subscribe(
      transactionsDTO => {
        this.zone.run(() => (this.transactionsDTO = transactionsDTO));
        this.hideComponentLoading(refresher);
      },
      (err: HttpErrorResponse) => {
        this.hideComponentLoading(refresher);
        this.showMessageError('Falha ao consultar as notas');
      }
    );
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

}
