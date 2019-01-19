import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListTransactionsPage } from './list-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: ListTransactionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListTransactionsPage]
})
export class ListTransactionsPageModule {}
