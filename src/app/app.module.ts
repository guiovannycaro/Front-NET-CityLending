import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule} from  '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthModule } from './auth/auth.module';


import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UbicacionesComponent } from './pages/ubicaciones/ubicaciones.component';
import { PerfilesComponent } from './pages/perfiles/perfiles.component';
import { AreasComponent } from './pages/areas/areas.component';
import { CompaniasComponent } from './pages/companias/companias.component';
import { ProgramadorComponent } from './pages/programador/programador.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AddperfilComponent } from './modal/perfil/addperfil/addperfil.component';
import { EditperfilComponent } from './modal/perfil/editperfil/editperfil.component';
import { DropperfilComponent } from './modal/perfil/dropperfil/dropperfil.component';
import { DropcompanyComponent } from './modal/company/dropcompany/dropcompany.component';
import { AddcompanyComponent } from './modal/company/addcompany/addcompany.component';
import { EditcompanyComponent } from './modal/company/editcompany/editcompany.component';
import { EdituserComponent } from './modal/user/edituser/edituser.component';
import { AdduserComponent } from './modal/user/adduser/adduser.component';
import { DropuserComponent } from './modal/user/dropuser/dropuser.component';
import { AddareaComponent } from './modal/area/addarea/addarea.component';
import { EditareaComponent } from './modal/area/editarea/editarea.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AddubicacionComponent } from './modal/ubicaciones/addubicacion/addubicacion.component';
import { EditubicacionComponent } from './modal/ubicaciones/editubicacion/editubicacion.component';
import { DropubicacionComponent } from './modal/ubicaciones/dropubicacion/dropubicacion.component';



@NgModule({
  declarations: [
    AppComponent,

    NopageFoundComponent,
    NavbarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SidebarComponent,

    DashboardComponent,
    UsuariosComponent,
    UbicacionesComponent,
    PerfilesComponent,
    AreasComponent,
    CompaniasComponent,
    ProgramadorComponent,

    AddareaComponent,
    EditareaComponent,

    AddperfilComponent,
    EditperfilComponent,
    DropperfilComponent,
    DropcompanyComponent,
    AddcompanyComponent,
    EditcompanyComponent,
    EdituserComponent,
    AdduserComponent,
    DropuserComponent,
    AddubicacionComponent,
    EditubicacionComponent,
    DropubicacionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    FormsModule,
    HttpClientModule,
    MatDialogModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
