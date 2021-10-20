import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [ BreadcrumbsComponent, HeaderComponent, SidebarComponent ],
  exports: [ BreadcrumbsComponent, HeaderComponent, SidebarComponent ],
  imports: [ CommonModule, RouterModule ]
})
export class SharedModule { }
