import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx'

import { RegisterNotePage } from './register-note.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterNotePage
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
  declarations: [RegisterNotePage],
  providers: [
    DatePicker
  ]
})
export class RegisterNotePageModule { }
