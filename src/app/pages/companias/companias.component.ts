import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
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
export class CompaniasComponent  implements OnInit{

   companias: Compania[] = [];

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
      this.companias = [...dato];

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
      this.obtenerCompany();
    }
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


}
