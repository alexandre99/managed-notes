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
export class ListTransactionsPage {

  static pageName = 'list-transactions';

  transactionsDTO: TransactionDTO[] = [];
  recipe: number = 0.00;
  expense: number = 0.00;
  valuesTotalizer: number = 0.00;

  private loading: any;

  constructor(
    private transactionService: TransactionService,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  ionViewDidEnter() {
    this.inicializarLista();
  }

  inicializarLista(refresher?: any) {
    from(this.presentLoading()).subscribe(() => this.findAllTransactions(refresher));
  }

  deleteTransaction(id: string) {
    this.presentAlertConfirm(id);
  }

  findAllTransactions(refresher?: any) {
    this.transactionService.findAll().subscribe(
      (transactions: TransactionDTO[]) => {
        transactions.forEach((dto: TransactionDTO) => {
          let typeTransaction: TypeTransaction = TypeTransaction[dto.transaction.typeTransaction];
          dto.transaction.typeTransaction = typeTransaction;
        });
        this.transactionsDTO = transactions;
        this.hideComponentLoading(refresher);
        this.updateTotalizer();
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

  updateTotalizer() {
    this.recipe = this.sumBy(TypeTransaction.RECIPE);
    this.expense = this.sumBy(TypeTransaction.EXPENSE);
    this.valuesTotalizer = this.recipe - this.expense;
  }

  sumBy(typeTransaction: TypeTransaction): number {
    return this.transactionsDTO.map((transactionDto: TransactionDTO) => transactionDto.transaction)
      .filter((transaction: Transaction) => transaction.typeTransaction === typeTransaction)
      .map((transaction: Transaction) => transaction.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: '<strong>Confirma a exclusão da Transação?</strong>',
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
              this.transactionService.delete(id).subscribe(
                data => {
                  this.loading.dismiss();
                  from(this.showMessageSuccess(data.message)).subscribe(() =>
                    this.inicializarLista()
                  );
                },
                (err: HttpErrorResponse) => {
                  this.loading.dismiss();
                  console.log(err);
                  this.showMessageError('Falha ao consultar as transações');
                }
              );
            });
          }
        }
      ]
    });

    await alert.present();
  }

  private async showMessageSuccess(message: string) {
    const alert = await this.alertController.create({
      header: 'Info',
      message: message,
      buttons: ['Ok']
    });
    return await alert.present();
  }
}
