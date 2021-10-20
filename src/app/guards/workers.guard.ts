import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class WorkersGuard implements CanActivate {
  
  
  constructor( private usuarioService: UsuarioService,
               private router: Router ) { }
  
  
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

    // if (!(this.usuarioService.usuario.trabajador === 'ADMINISTRADOR')) {
    //   this.router.navigateByUrl('/dashboard/home');
    //   return false;
    // }

    return true;
  }
  
}
