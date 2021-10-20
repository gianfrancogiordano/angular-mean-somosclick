import { Component, OnInit } from '@angular/core';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SettingServiceService } from '../services/setting-service.service';

declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  public onLine: boolean
  public year = new Date().getFullYear();

  constructor( private settingServiceService: SettingServiceService ) { }

  ngOnInit() {
    customInitFunction();
    this.createOnline().subscribe(isOnline => {
      
      this.onLine = isOnline;
      if( !isOnline ) {

        this.toast.fire({
          icon: 'error',
          title: 'Sin Conexión a Internet',
          timerProgressBar: true
        });
      }

    });
  }

  createOnline() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }

}
