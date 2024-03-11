import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'desafio-tecnico-usuarios';

  isLogged: boolean = false;
  showLoginForm: boolean = true;
  showComponents: boolean = true;

  constructor(private router:Router, private userService:UserService){
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showComponents = false; // Oculta los componentes al iniciar la navegación
      } else if (event instanceof NavigationEnd) {
        this.showComponents = true; // Muestra los componentes al finalizar la navegación
      }
    });
  }


  onLoginSuccess() {
    this.isLogged = true;
    this.showLoginForm = false; // Oculta el formulario de inicio de sesión después de iniciar sesión
  }
  
  ngOnInit(): void {
    let authToken = localStorage.getItem('tokenLogin');
    if (authToken) {
      // Token encontrado en localStorage, el usuario está autenticado
      this.isLogged = true;
      this.showLoginForm = false
    } else{
      this.isLogged = false;
      this.showLoginForm = true
    }
  }
  visibilityState: { [key: string]: boolean } = {
    mostrarComponentesUsuarios: false,
  };

  toggleComponent(component: string) {
    this.visibilityState[component] = !this.visibilityState[component];
  }

  isComponentVisible(component: string) {
    return this.visibilityState[component];
  }

  logout(){
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que deseas cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, elimina los datos de inicio de sesión y recargar la página
        localStorage.removeItem('tokenLogin');
        localStorage.removeItem('rolLogin');
        window.location.reload();
      }
    });
  }
}
