import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { RestService } from 'src/app/services/rest.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListaUsuariosComponent implements OnInit {
  constructor(private rest: RestService, private userService: UserService, private router:Router) {}

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nombre', 'correo', 'rol', 'acciones'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Usuario | null;

  selectedUser: Usuario | null = null;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  usuarioArray: any[] = [];
  user = new Usuario();

  isAdmin: boolean = false;


  getListUsuarios() {
    this.rest.getUsuario().subscribe(
      (info: any) => {
        this.dataSource = new MatTableDataSource<any>(info);
        this.dataSource.paginator = this.paginator;
        this.usuarioArray = info;
      },
      (error) => {
        console.log('Error al obtener datos');
      }
    );
  }
  eliminarUsuario(id: any) {
    Swal.fire({
      title: 'Eliminar usuario',
      text: '¿Estás seguro de que deseas eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rest.deleteUsuario(id).subscribe(
          () => {
            console.log('Usuario eliminado con éxito.');
            this.getListUsuarios();
  
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: 'success',
              title: 'Usuario eliminado',
              text: 'El usuario se ha eliminado con éxito.'
            });
          },
          (error) => {
            console.error('Error al eliminar usuario:', error);
              Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el usuario. Por favor, intenta nuevamente.'
            });
          }
        );
      }
    });
  }
  

  infoUsuario(usuario: Usuario) {
    let usuarioEncontrado = this.usuarioArray.find((user) => user.id === usuario.id);
    if (usuarioEncontrado) {
      this.user = { ...usuarioEncontrado };
      console.log("Usuario encontrado!", this.user);
      this.userService.selectedUser(this.user);
      this.userService.setEditandoUsuario(true); 
      this.router.navigate(['/agregar-usuario']);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    let rol = localStorage.getItem('rolLogin')
    this.isAdmin = rol === 'Administrador';
    this.getListUsuarios();
  }
}
