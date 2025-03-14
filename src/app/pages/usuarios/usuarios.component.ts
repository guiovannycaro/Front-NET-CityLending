import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Usuarios } from '../../modelos/usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { AddcompanyComponent } from '../../modal/company/addcompany/addcompany.component';
import { EditcompanyComponent } from 'src/app/modal/company/editcompany/editcompany.component';
import { EdituserComponent } from 'src/app/modal/user/edituser/edituser.component';
import { AdduserComponent } from 'src/app/modal/user/adduser/adduser.component';


declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{


   usuarios: Usuarios[] = [];

     constructor(
      private api: UsuariosService,
      private router: Router,
      public dialog: MatDialog
    ) {}

    ngOnInit(): void {
      this.obtenerUsuarios();
    }


    private obtenerUsuarios() {
      this.api.getUsuariosList().subscribe(dato => {
        console.log("Datos recibidos del backend:", dato);
        this.usuarios = [...dato];


      });
    }






  openAddComForm() {
      this.dialog.open(AdduserComponent);

    }


    openEditProForm(id: number) {
      if (!id) {
        console.error("Error: ID es undefined o null");
        return;
      }


      this.dialog.open(EdituserComponent, {
        data: { com_idcompany: id },
        width: '500px'
      });
    }

 openDropProForm(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.eliminarusuario(id).subscribe({
          next: (data) => {
            console.log('Usuario eliminada:', data);
            Swal.fire('¡Eliminado!', 'El Usuario ha sido eliminada.', 'success');
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al eliminar Usuario:', error);
            Swal.fire('Error', 'No se pudo eliminar el Usuario.', 'error');
          }
        });
      }
    });
  }






}
