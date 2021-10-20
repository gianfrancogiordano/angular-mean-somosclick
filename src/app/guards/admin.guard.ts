import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor( private usuarioService: UsuarioService,
               private router: Router ) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // if (!(this.usuarioService.usuario.role === 'ADMIN_ROLE')) {
    //   this.router.navigateByUrl('/dashboard');
    //   return false;
    // }
    
    return true;
  }
  
}
