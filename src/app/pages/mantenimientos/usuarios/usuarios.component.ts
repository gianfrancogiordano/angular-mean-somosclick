import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'src/app/interfaces/table.interfaces';

import { UsuarioService } from '../../../services/usuario.service';
import { RolesService } from '../../../services/roles.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  public permisosModulo: any = {};
  public roles: any = [];
  public cargando: boolean = true;
  public porPagina: number = 10;
  public filtro: string = '';
  public tableData: Table = {
    conteo: 0,
    data: [],
    pagActual: 1,
    ultimaPag: 1,
    pagSiguiente: 0,
    pagAnterior: 0,
    pagTotal: 0,
    paginas: []
  };

  constructor( private usuarioService: UsuarioService,
               private rolesService: RolesService,
               private router: Router ) { }

  ngOnInit() {
    this.getPermisos();
    this.getUsuarios();
    this.getRoles();
  }

  getPermisos() {
    const permisos = this.usuarioService.usuario.role.modulos;
    permisos.forEach(m => {
      if (m.modulo === 'usuarios[SubMenu]') {
        this.permisosModulo = m;
      }
    });

  }

  getRoles() {
    this.rolesService.getRoles(1,1000,'')
        .subscribe( roles => {
          this.roles = roles.data;
        });
  }

  getUsuarios() {
    this.usuarioService.getUsuarios(this.tableData.pagActual, this.porPagina, this.filtro)
        .subscribe( usuarios => {
          this.cargando = false;
          this.tableData = usuarios;
        });
  }

  buscarUsuario(query: string) {
    this.filtro = query;
    this.getUsuarios();
  }

  actualizarUsuario(usuario: any) {
    if(this.permisosModulo.editar) {
      this.router.navigateByUrl(`/dashboard/usuario/${usuario._id}`);
    } else {

      this.toast.fire({
        icon: 'error',
        title: 'No tienes permiso para editar!'
      });

    }
  }

  onChange( usuario: any ) {

    if (this.permisosModulo.editar) {

      this.usuarioService.updateUsuario(usuario, usuario._id)
          .subscribe( () => {
            
            this.toast.fire({
              icon: 'success',
              title: 'Usuario Actualizado!'
            });
  
          }, (error: any) => {
  
            this.toast.fire({
              icon: 'error',
              title: 'Ocurrio un error',
            });
  
          });
    } else {

      this.toast.fire({
        icon: 'error',
        title: 'No tienes permisos para editar!'
      });
    }
  }

  mostrar(event: any): void {
    this.porPagina = Number(event.value);
    this.getUsuarios();
  }

}
