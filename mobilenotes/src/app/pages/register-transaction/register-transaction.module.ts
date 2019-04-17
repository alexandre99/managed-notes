import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';

import { IonicModule } from '@ionic/angular';

import { RegisterTransactionPage } from './register-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterTransactionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterTransactionPage],
  providers: [
    DatePicker
  ]
})
export class RegisterTransactionPageModule {}
