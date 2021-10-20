import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router ) { }

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

  guardarStorage(token: string, menu: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  getUsuarios( pagina: number, porPagina: number, filtro: string ) {
    return this.http.get( `${ base_url }/usuarios?pagina=${ pagina }&porPagina=${ porPagina }&filtro=${filtro}`, this.headers )
      .pipe(
        map( (resp: any) => resp.body )
      );
  }

  getUsuario( id: string ) {
    return this.http.get(`${ base_url }/usuarios/${ id }`, this.headers)
      .pipe(
        map((resp: any) => {
          return resp.body;
        })
      );
  }

  nuevoUsuario( formulario: any ) {
    return this.http.post(`${base_url}/usuarios`, formulario ,this.headers).pipe(
      map( (resp: any) => {
        return resp.body;
      })
    )
  }

  updateUsuario( data: any, id: string ) {
    return this.http.put(`${base_url}/usuarios/${id}`, data, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  login( usuario: Usuario ) {
    return this.http.post(`${ base_url }/login`, usuario, this.headers ).pipe(
        tap((resp: any) => {

          this.guardarStorage(resp.token, resp.menu);

        }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${ base_url }/login/renew`, this.headers ).pipe(
      map((resp: any) => {

        const usuario = resp.usuarioBD;
        const clinica = resp.usuarioBD.clinica;
        const role = resp.usuarioBD.role;

        this.usuario = new Usuario(usuario.nombre, usuario.user, usuario.email, '','',role, clinica._id, usuario._id);
        this.guardarStorage( resp.token, resp.menu );

        return true;

      }),
      catchError( () => of(false) ));
  }

}
