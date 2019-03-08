import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-register-transaction',
  templateUrl: './register-transaction.page.html',
  styleUrls: ['./register-transaction.page.scss'],
})
export class RegisterTransactionPage implements OnInit {

  static pageName = 'register-transaction';
  transactionDTOForm: FormGroup;
  loading: any;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
  }

  private iniciarFormGroup() {
    this.transactionDTOForm = new FormGroup({
      id: this.formBuilder.control(''),
      note: new FormGroup({
        title: this.formBuilder.control('', [Validators.required]),
        description: this.formBuilder.control('', [Validators.required])
      })
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
