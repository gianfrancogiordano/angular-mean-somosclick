import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from '../../../services/usuario.service';

import Swal from 'sweetalert2';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });

  public submitBtn: boolean = false;
  public roles: any = [];
  public editUsuario: any = [];
  public editValidators = [];
  public formSubmitted: boolean = false;
  public uid: string;
  public formUsuario = this.fb.group({
    
      nombre: [ '', [Validators.required]],
      user: ['', [Validators.required]],
      password: ['', this.editValidators],
      repassword: ['', this.editValidators],
      role: ['', [Validators.required]],
      email: ['', [Validators.required]],
      activo: ['1', [Validators.required]],

    },
    {
      validators: [this.equalpasswords( 'password', 'repassword' )]
    });

  constructor( private route: ActivatedRoute,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private rolesService: RolesService) { }

  ngOnInit() {
    this.getRoles();
    this.route.params.subscribe( params => {
      this.uid = params.id 
      this.getUsuario();
    });
  }

  getRoles() {
    this.rolesService.getRoles(1, 1000, '')
      .subscribe(roles => {
        this.roles = roles.data;
      });
  }

  getUsuario() {

    if (this.uid === 'nuevo') {

      this.formUsuario.get('password').setValidators(this.editValidators.concat(Validators.required));
      this.formUsuario.get('repassword').setValidators(this.editValidators.concat(Validators.required));
      this.formUsuario.get('password').updateValueAndValidity();
      this.formUsuario.get('repassword').updateValueAndValidity();
      return;

    } else {

      this.usuarioService.getUsuario(this.uid)
        .subscribe(resp => {

          this.editUsuario = resp;
          this.formUsuario.setValue({
            
            nombre: resp.nombre,
            user: resp.user,
            password: '',
            repassword: '',
            role: resp.role,
            activo: resp.activo,
            email: resp.email,

          });
        });

    }
    
  }

  nuevoUsuario() {

    if (this.uid === 'nuevo') {

      this.formSubmitted = true;
      if ( this.formUsuario.valid ) {

        const datos = {
          ... this.formUsuario.value,
          clinica: this.usuarioService.usuario.clinica
        }

        this.submitBtn = true;
        this.usuarioService.nuevoUsuario(datos)
          .subscribe( resp => {

            this.formSubmitted = false;
            this.submitBtn = false;
            this.formUsuario.reset();

            Swal.fire('Usuario Creado', `El usuario ${this.formUsuario.get('nombre').value} fue creado con exito`, 'success');

          }, (err: any) => {

            this.formSubmitted = false;
            this.submitBtn = false;

            Swal.fire('Error', `Ocurrio un error inesperado, contacte al administrador`, 'error');

          });

      }

    } else {

      const usuarioUpdateData = {
        ... this.formUsuario.value,
        _id: this.editUsuario._id,
        clinica: this.editUsuario.clinica
      }

      if(usuarioUpdateData.password === '') {
        delete usuarioUpdateData.password;
      }

      delete usuarioUpdateData.repassword;

      this.usuarioService.updateUsuario(usuarioUpdateData, this.editUsuario._id)
        .subscribe(resp => {
          this.submitBtn = false;

          this.toast.fire({
            icon: 'success',
            title: 'Usuario Actualizado!'
          });

        });

    }

  }

  campoNoValido( campo: string ): boolean {
    if( this.formUsuario.get( campo ).invalid && this.formSubmitted ) {
      return true;
    }

  }

  equalpasswords(clave: string, reclave: string) {
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get( clave );
      const pass2Control = formGroup.get( reclave );

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors( null );
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }

    }

  }

}
