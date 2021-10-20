import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ]
})
export class AuthModule { }
