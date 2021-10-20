import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { RolesService } from '../../../services/roles.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styles: []
})
export class RolComponent implements OnInit {

  public roleId: string = '';
  public role = {

      descripcion: "",
      clinica: "",
      modulos: [
        {
          modulo: "administrativo[Menu]",
          visualizar: false,
          editar: false,
          eliminar: false
        },
        {
          modulo: "dashboard[SubMenu]",
          visualizar: false,
          editar: false,
          eliminar: false
        },
        {
          modulo: "roles[SubMenu]",
          visualizar: false,
          editar: false,
          eliminar: false
        },
        {
          modulo: "usuarios[SubMenu]",
          visualizar: false,
          editar: false,
          eliminar: false
        },
        {
          modulo: "pacientes[Menu]",
          visualizar: false,
          editar: false,
          eliminar: false
        },
        {
          modulo: "pacientes[SubMenu]",
          visualizar: false,
          editar: false,
          eliminar: false
        }
      ]
    };

  constructor(private route: ActivatedRoute,
              private rolesService: RolesService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.roleId = params.id
      if (this.roleId != 'nuevo') {
        this.getRole();
      } else {
        this.role.clinica = this.usuarioService.usuario.clinica;
      }

    });
  }

  getRole() {
    this.rolesService.getRole(this.roleId)
        .subscribe( role => {
          this.role = role;
        });
  }

  actualizarRole() {

    if (this.roleId == 'nuevo') {

      if( this.role.descripcion === '' ) {
        return Swal.fire({
          title: 'Error!',
          text: `Debe escribir el nombre del role`,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#398bf7',
        });
      }

      this.rolesService.newRole( this.role )
          .subscribe( newRole => {

            this.role = newRole;
            Swal.fire({
              title: 'Nuevo Role',
              text: `El role fue creado con exito`,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#398bf7',
            });

          }, (error: any) => {

            Swal.fire({
              title: 'Error!',
              text: `${error.error.body}`,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#398bf7',
            });

          });

    } else {

      this.rolesService.updateRole(this.roleId, this.role)
        .subscribe(updatedRole => {

          this.role = updatedRole;
          Swal.fire({
            title: 'Role Actualizado',
            text: `El role fue actualizado con exito`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#398bf7',
          });

        }, (error: any) => {

          Swal.fire({
            title: 'Error!',
            text: `${error.error.body}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#398bf7',
          });

        });
    }

  }

}
