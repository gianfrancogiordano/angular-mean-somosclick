import { Component, OnInit, Renderer2 } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;

  public menu: any[] = [];

  constructor( private sidebarService: SidebarService,
               private usuarioService: UsuarioService,
               private renderer: Renderer2 ) {

    this.sidebarService.cargarMenu();
    this.menu = this.sidebarService.menu;
    this.usuario = this.usuarioService.usuario;
    
  }

  logout() {
    this.usuarioService.logout();
  }

  ngOnInit() { }

  closeNavbar() {
    this.renderer.removeClass(document.body, 'show-sidebar');
  }

}
