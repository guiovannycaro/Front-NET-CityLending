import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Ubicaciones } from '../../modelos/ubicaciones';
import { UbicacionesService } from '../../services/ubicaciones.service';
import { EditubicacionComponent } from 'src/app/modal/ubicaciones/editubicacion/editubicacion.component';
import { AddubicacionComponent } from 'src/app/modal/ubicaciones/addubicacion/addubicacion.component';



declare var $: any;

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent  implements OnInit{

  ubicaciones: Ubicaciones[] = [];

  constructor(
   private api: UbicacionesService,
   private router: Router,
   public dialog: MatDialog
 ) {}

 ngOnInit(): void {
   this.obtenerUbicacion();
 }

 private obtenerUbicacion() {
      this.api.getUbicacionesList().subscribe(dato => {
        console.log("Datos recibidos del backend:", dato);
        this.ubicaciones = dato;

        setTimeout(() => {
          this.inicializarDataTable();
        }, 300);
      });
    }


    private inicializarDataTable() {
      if ($.fn.DataTable.isDataTable("#dtBasicExample")) {
        $('#dtBasicExample').DataTable().destroy();
      }
    }

    onEnter(event: KeyboardEvent) {
      if (event.key === "Enter") {
        console.log("Enter presionado, recargando datos...");
        this.obtenerUbicacion();
      }
    }

  openAddComForm() {
      this.dialog.open(AddubicacionComponent);

    }


    openEditProForm(id: number) {
      if (!id) {
        console.error("Error: ID es undefined o null");
        return;
      }


      this.dialog.open(EditubicacionComponent, {
        data: { sch_iduser: id },
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
        this.api.eliminarUbicaciones(id).subscribe({
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
