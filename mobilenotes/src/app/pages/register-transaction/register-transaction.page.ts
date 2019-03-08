import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { NumberValidator } from '../../util/validators/number.validator';
import { TransactionDTO } from '../../model/transactionDTO';
import { Transaction } from '../../model/transaction';

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
    const id: string = this.route.snapshot.params['id'];
    this.initFormGroup();
    if (id) {
      this.loadingTransactionForUpdate(id);
    }
  }

  private loadingTransactionForUpdate(id: string) {
    from(this.presentLoading()).subscribe(() =>
      this.transactionService.findById(id).subscribe(transactionDTO => {
        this.loading.dismiss();
        this.transactionDTOForm.setValue(transactionDTO);
      })
    );
  }

  private initFormGroup() {
    this.transactionDTOForm = new FormGroup({
      id: this.formBuilder.control(''),
      transaction: new FormGroup({
        value: this.formBuilder.control('', [Validators.required, NumberValidator.validGtZero]),
        typeTransaction: this.formBuilder.control('', [Validators.required]),
        date: this.formBuilder.control('', [Validators.required]),
        category: this.formBuilder.control('', [Validators.required])
      })
    });
  }

  saveOrUpdate() {
    const noteDTO = this.transactionDTOForm.value;
    const note = noteDTO.note;
    from(this.presentLoading()).subscribe(() => {
      if (!noteDTO.id) {
        this.save(note);
      } else {
        this.update(noteDTO);
      }
    });
  }

  private update(transactionDTO: TransactionDTO) {
    this.transactionService
      .update(transactionDTO)
      .subscribe(
        data => this.callBackSaveSuccess(data.message),
        (error: HttpErrorResponse) =>
          this.callBackSaveError(error, 'Erro ao tentar atualizar nota')
      );
  }

  private save(transaction: Transaction) {
    this.transactionService
      .save(transaction)
      .subscribe(
        data => this.callBackSaveSuccess(data.message),
        (error: HttpErrorResponse) =>
          this.callBackSaveError(error, 'Erro ao tentar salvar nota')
      );
  }

  private callBackSaveError(error, message) {
    console.log(error);
    this.loading.dismiss();
    this.showMessageError(message);
  }

  private callBackSaveSuccess(message) {
    this.loading.dismiss();
    from(this.showMessageSucess(message)).subscribe(() => this.location.back());
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
