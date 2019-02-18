import { Component, OnInit, NgZone } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { TransactionDTO } from '../../model/transactionDTO';
import { Transaction } from '../../model/transaction';
import { TypeTransaction } from '../../model/typeTransaction';
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
    private loadingController: LoadingController) { }

  ngOnInit(): void {
    this.inicializarLista();
  }

  inicializarLista(refresher?: any) {
    from(this.presentLoading()).subscribe(() => this.findAllTransactions(refresher));
  }

  findAllTransactions(refresher?: any) {
    let that = this;
    this.transactionService.findAll().subscribe(
      (transactions: TransactionDTO[]) => {
        transactions.forEach((dto: TransactionDTO) => {
          let typeTransaction: TypeTransaction = TypeTransaction[dto.transaction.typeTransaction];
          dto.transaction.typeTransaction = typeTransaction;
        });
        this.transactionsDTO = transactions;
        this.hideComponentLoading(refresher);
      },
      (err: HttpErrorResponse) => {
        this.hideComponentLoading(refresher);
        this.showMessageError('Falha ao consultar as transações');
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

  iconTransaction(transaction: Transaction): string {
    return transaction.typeTransaction == TypeTransaction.EXPENSE ? 'trending-down' : 'trending-up';
  }

}
