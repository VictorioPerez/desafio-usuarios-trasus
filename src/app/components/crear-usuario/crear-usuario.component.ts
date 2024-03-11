import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { RestService } from 'src/app/services/rest.service';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent {
  usuarioForm!: FormGroup;
  rol = new FormControl('');
  usuarioEditando: Usuario | null = null;
  hide = true;
  editandoUsuario: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rest: RestService,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.userService.editandoUsuario$.subscribe(editando => {
      this.editandoUsuario = editando;
    });

    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: new FormControl(''),
      contrasena: ['', Validators.required],
    });

    this.userService.usuarioSeleccionado$.subscribe(usuario =>{
      if(usuario){
        this.cargarUsuario(usuario);
      }
    })
    
  }

  /* Utilizo biblioteca UUID que me permite generar identificadores únicos */
  /* El metodo utilizado es para acortar la longitud del ID */
  generarIdCorto(longitud: number): string {
    let idCompleto = uuidv4(); // Generar UUID
    return idCompleto.substr(0, longitud); // Truncar a la longitud deseada
  }

  limpiarCampos() {
    this.usuarioForm.reset();
  }
  
/*Metodo para pegar la información del usuario en el formulario  */
  cargarUsuario(usuario: Usuario) {
    this.usuarioEditando = usuario;
    this.usuarioForm.patchValue({
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      contrasena:usuario.contrasena
    });
  }


  agregarUsuario() {
    if (this.usuarioForm.valid) {
      let usuario: Usuario = {
        id: this.generarIdCorto(2),
        nombre: this.usuarioForm.get('nombre')?.value,
        correo: this.usuarioForm.get('correo')?.value,
        rol: this.usuarioForm.get('rol')?.value,
        contrasena: this.usuarioForm.get('contrasena')?.value,
      };
      this.rest.postUsuario(usuario).subscribe(
        (response) => {
          console.log(usuario);
          console.log('Usuario creado');
          this.userService.addUser(usuario);
          this.limpiarCampos();
          this.router.navigate(['/lista-usuarios']);
          Swal.fire({
            icon: 'success',
            title: 'Usuario agregado',
            text: 'El usuario se ha agregado con éxito.'
          });
        },
        (error) => {
          console.log('Error al crear usuario');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo agregar el usuario. Por favor, intenta nuevamente.'
          });
        }
      );
      
    } else {
      // Marcar campos como tocados para mostrar mensajes de error
      this.usuarioForm.markAllAsTouched();
    }
  }
  editarUsuario() {
    if (this.usuarioEditando && this.usuarioEditando.id) {
      // Mostrar mensaje de confirmación
      Swal.fire({
        title: 'Editar usuario',
        text: '¿Estás seguro de que deseas editar este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
  
          // Verificar si el id existe antes de asignarlo
          let idUsuarioEditando = this.usuarioEditando?.id || '';
  
          let usuarioEditado: Usuario = {
            ...this.usuarioEditando,
            nombre: this.usuarioForm.get('nombre')?.value,
            correo: this.usuarioForm.get('correo')?.value,
            rol: this.usuarioForm.get('rol')?.value,
            contrasena: this.usuarioForm.get('contrasena')?.value,
            id: idUsuarioEditando // Asignar id
          };
  
          console.log(usuarioEditado.id);
          // código para enviar la solicitud PUT
          this.rest.putUsuario(usuarioEditado).subscribe(
            (response) => {
              this.userService.updateUser(usuarioEditado);
              console.log("actualizado con exito");
              this.limpiarCampos();
  
              Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado',
                text: 'El usuario se ha actualizado con éxito.'
              });
              this.router.navigate(['/lista-usuarios']);

            },
            (error) => {
              console.error('Error al actualizar el usuario:', error);
  
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el usuario. Por favor, intenta nuevamente.'
              });
            }
          );
        }
      });
    }
  }
  
}
