import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public submitBtn: boolean = false;
  public loginForm = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    recordarme: [ false ]
  });

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService,
               private router: Router ) {

    this.cambiarImgFabrica();
  }

  ngOnInit() {
  }

  login() {

    if ( this.loginForm.invalid ) {
      return;
    }

    this.submitBtn = true;
    this.usuarioService.login( this.loginForm.value )
      .subscribe( (login: any) => {

        

        if (this.loginForm.get('recordarme').value) {

          localStorage.setItem('usuario', this.loginForm.get('usuario').value);
          localStorage.setItem('recordarme', this.loginForm.get('recordarme').value);

        } else {

          localStorage.removeItem('email');
          localStorage.removeItem('recordarme');

        }

        this.submitBtn = false;
        this.router.navigateByUrl('/');

      }, (err) => {

        console.log(err);

        this.submitBtn = false;

        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Intentarlo nuevamente!',
          confirmButtonColor: '#398bf7',
        });

      });

  }

  cambiarImgFabrica() {
    console.log(document.location.href);
  }

}
