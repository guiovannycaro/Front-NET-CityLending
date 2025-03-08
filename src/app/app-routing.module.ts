import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UbicacionesComponent } from './pages/ubicaciones/ubicaciones.component';
import { PerfilesComponent } from './pages/perfiles/perfiles.component';
import { AreasComponent } from './pages/areas/areas.component';
import { CompaniasComponent } from './pages/companias/companias.component';
import { ProgramadorComponent } from './pages/programador/programador.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/ubicaciones', component: UbicacionesComponent},
  { path: 'dashboard/areas', component: AreasComponent},
  { path: 'dashboard/perfiles', component: PerfilesComponent},
  { path: 'dashboard/companias', component: CompaniasComponent},
  { path: 'dashboard/usuarios', component: UsuariosComponent},
  { path: 'dashboard/programador', component: ProgramadorComponent},
  { path: '**', component: NopageFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthRoutingModule

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
