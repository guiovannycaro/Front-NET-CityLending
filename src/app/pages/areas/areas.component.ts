import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Areas } from '../../interfases/areas';
import { AreasService } from '../../services/areas.service';
import { AddareaComponent } from 'src/app/modal/area/addarea/addarea.component';
import { EditareaComponent } from 'src/app/modal/area/editarea/editarea.component';

declare var $: any;




/** Constants used to fill up our data base. */


@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent  implements AfterViewInit,OnInit {
 displayedColumns: string[] = ['id', 'Descripcion', 'Estado','Acciones'];
  dataSource = new MatTableDataSource<Areas>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: AreasService,
      private router: Router,
      public dialog: MatDialog

    ) {

  }


  ngOnInit(): void {
    this.obtenerAreas();
  }

  private obtenerAreas() {
    this.api.getAreasList().subscribe({
      next: (dato) => {
        console.log("Datos recibidos del backend:", dato);
        this.dataSource = new MatTableDataSource(dato);
        this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      },
      error: (x) => {
        console.error("Error al obtener áreas:", x);
        Swal.fire("Error", "No se pudo obtener la lista de áreas.", "error");
      }
    });
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



