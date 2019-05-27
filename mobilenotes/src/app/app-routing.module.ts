import { RegisterTransactionPage } from './pages/register-transaction/register-transaction.page';
import { ListTransactionsPage } from './pages/list-transactions/list-transactions.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterNotePage } from './../app/pages/register-note/register-note.page';
import { ListNotesPage } from './pages/list-notes/list-notes.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/' + ListNotesPage.pageName,
    pathMatch: 'full'
  },
  {
    path: ListNotesPage.pageName,
    loadChildren: './pages/list-notes/list-notes.module#ListNotesPageModule'
  },
  {
    path: RegisterNotePage.pageName,
    loadChildren: './pages/register-note/register-note.module#RegisterNotePageModule'
  },
  {
    path: RegisterNotePage.pageName + '/:id',
    loadChildren: './pages/register-note/register-note.module#RegisterNotePageModule'
  },
  {
    path: ListTransactionsPage.pageName,
    loadChildren: './pages/list-transactions/list-transactions.module#ListTransactionsPageModule'
  },
  { path: RegisterTransactionPage.pageName, 
    loadChildren: './pages/register-transaction/register-transaction.module#RegisterTransactionPageModule' 
  },
  { path: RegisterTransactionPage.pageName + '/:id', 
    loadChildren: './pages/register-transaction/register-transaction.module#RegisterTransactionPageModule' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
