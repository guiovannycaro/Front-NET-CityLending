import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Areas } from '../../modelos/areas';
import { AreasService } from '../../services/areas.service';
import { AddareaComponent } from '../../modal/area/addarea/addarea.component';
import { EditareaComponent } from 'src/app/modal/area/editarea/editarea.component';


declare var $: any;

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  areas: Areas[] = [];

  constructor(
    private api: AreasService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerAreas();
  }

  private obtenerAreas() {
    this.api.getAreasList().subscribe(dato => {
      console.log("Datos recibidos del backend:", dato);
      this.areas = [...dato];

      setTimeout(() => {
        this.inicializarDataTable();
      }, 300);
    });
  }

  private inicializarDataTable() {
    if ($.fn.DataTable.isDataTable("#dtBasicExample")) {
      $('#dtBasicExample').DataTable().destroy();
    }

    setTimeout(() => {
      $('#dtBasicExample').DataTable({
        responsive: true

      });
    }, 100);
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === "Enter") {
      console.log("Enter presionado, recargando datos...");
      this.obtenerAreas();
    }
  }

  openAddProForm() {
    this.dialog.open(AddareaComponent);

  }


  openEditProForm(id: number) {
    if (!id) {
      console.error("Error: ID es undefined o null");
      return;
    }

    this.dialog.open(EditareaComponent, {
      data: { are_idcarea: id },
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
        this.api.eliminarArea(id).subscribe({
          next: (data) => {
            console.log('Área eliminada:', data);
            Swal.fire('¡Eliminado!', 'El área ha sido eliminada.', 'success');
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al eliminar área:', error);
            Swal.fire('Error', 'No se pudo eliminar el área.', 'error');
          }
        });
      }
    });
  }





}
