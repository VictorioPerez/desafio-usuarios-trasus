import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private rest: RestService) {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  bodyEmail = {
    email: '',
  };

  credentials = {
    username: '',
    password: '',
    rol: ''
  };

  contrasena = {
    token: '',
    newPassword: '',
  };



  login() {
    this.rest.loginUsuario(this.credentials).subscribe(
      (response) => {
        console.log('Login exitoso!', response);    

        // Limpia los inputs de email y contraseña
        this.credentials = {
          username: '',
          password: '',
          rol: ''
        };

        this.loginForm.reset();
        localStorage.setItem('tokenLogin',JSON.stringify(response));
        localStorage.setItem('rolLogin',JSON.stringify(response)) 
        this.loginSuccess.emit();
      },
      (error) => {
        if (error.error.message == 'User not active') {
          console.log('error: ' + error);
        } else {
          console.log('error: ' + error);
        }
      }
    );
  }
}
