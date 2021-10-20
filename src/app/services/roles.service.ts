import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getRoles(pagina: number, porPagina: number, filtro: string) {

    return this.http.get(`${base_url}/role?pagina=${pagina}&porPagina=${porPagina}&filtro=${filtro}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  getRole(idRole: string) {

    return this.http.get(`${base_url}/role/${idRole}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  newRole( campos: any ) {

    return this.http.post(`${base_url}/role`, campos, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      );

  }

  updateRole( idRole: string, campos: any ) {

    return this.http.put(`${base_url}/role/${idRole}`, campos, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )

  }


}
