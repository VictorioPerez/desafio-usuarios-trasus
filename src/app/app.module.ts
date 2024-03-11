import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'listar-usuarios', component: ListaUsuariosComponent },
  { path: 'agregar-usuario', component: CrearUsuarioComponent },
  { path: '', redirectTo: '/listar-usuarios', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/listar-usuarios' } // Ruta para manejar rutas desconocidas
];

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    CrearUsuarioComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
