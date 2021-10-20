import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RolesComponent } from './mantenimientos/roles/roles.component';
import { RolComponent } from './mantenimientos/roles/rol.component';


@NgModule({
  declarations: [
    PagesComponent, 
    DashboardComponent,
    UsuariosComponent,
    AccountSettingsComponent,
    UsuarioComponent,
    RolesComponent,
    RolComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    ChartsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PagesModule { }
