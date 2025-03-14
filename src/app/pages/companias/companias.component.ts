import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';

import Swal from 'sweetalert2';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { Compania } from '../../modelos/compania';
import { CompaniasService } from '../../services/companias.service';
import { AddcompanyComponent } from '../../modal/company/addcompany/addcompany.component';
import { EditcompanyComponent } from 'src/app/modal/company/editcompany/editcompany.component';


declare var $: any;

@Component({
  selector: 'app-companias',
  templateUrl: './companias.component.html',
  styleUrls: ['./companias.component.css']
})
export class CompaniasComponent  implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['id', 'Nombre', 'Direccion','TipoDocumento',
    'NumDocumento','Ciudad','Estado','AccessSchedule','Acciones'];
   companias: Compania[] = [];
dataSource = new MatTableDataSource<Compania>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

   constructor(
    private api: CompaniasService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerCompany();
  }

  private obtenerCompany() {
    this.api.getCompanyList().subscribe(dato => {
      console.log("Datos recibidos del backend:", dato);
      this.companias = dato;
      this.dataSource = new MatTableDataSource(dato);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openAddComForm() {
      this.dialog.open(AddcompanyComponent);

    }


    openEditProForm(id: number) {
      if (!id) {
        console.error("Error: ID es undefined o null");
        return;
      }

      this.dialog.open(EditcompanyComponent, {
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
        this.api.eliminarCompany(id).subscribe({
          next: (data) => {
            console.log('Compania eliminada:', data);
            Swal.fire('¡Eliminado!', 'El Compania ha sido eliminada.', 'success');
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al eliminar Compania:', error);
            Swal.fire('Error', 'No se pudo eliminar el Compania.', 'error');
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
