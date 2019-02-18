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
    loadChildren:
      './pages/register-note/register-note.module#RegisterNotePageModule'
  },
  {
    path: RegisterNotePage.pageName + '/:id',
    loadChildren:
      './pages/register-note/register-note.module#RegisterNotePageModule'
  },
  {
    path: 'list-transactions',
    loadChildren: './pages/list-transactions/list-transactions.module#ListTransactionsPageModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
