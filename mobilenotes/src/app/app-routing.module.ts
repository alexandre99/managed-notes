import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './../app/pages/home/home.page';
import { RegisterNotePage } from './../app/pages/register-note/register-note.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: HomePage.pageName,
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  {
    path: RegisterNotePage.pageName,
    loadChildren:
      './pages/register-note/register-note.module#RegisterNotePageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
