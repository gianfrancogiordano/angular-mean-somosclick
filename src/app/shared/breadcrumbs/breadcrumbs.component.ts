import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent {

  public titulo: string;
  public argumentosRuta: Subscription;

  constructor( private router: Router ) {

    this.argumentosRuta = this.getArgumentosRuta()
      .subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = `Meredi - ${ titulo }`;
      })

  }

  ngOnDestroy(): void {
    this.argumentosRuta.unsubscribe();
  }

  getArgumentosRuta(): Observable<any> {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );
  }

}
