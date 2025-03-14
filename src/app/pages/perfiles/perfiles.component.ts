import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Perfil } from 'src/app/modelos/perfil';
import { PerfilesService } from 'src/app/services/perfiles.service';
import { AddperfilComponent } from 'src/app/modal/perfil/addperfil/addperfil.component';
import { EditperfilComponent } from 'src/app/modal/perfil/editperfil/editperfil.component';





@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'Descripcion', 'Estado','Acciones'];
  dataSource = new MatTableDataSource<Perfil>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  perfiles: Perfil [] =[];
  perfilesd: Perfil = new Perfil();

  constructor(private api:PerfilesService,private router:Router,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerPerfil();
  }


  openAddPerForm(){
    this.dialog.open(AddperfilComponent
    );
}

  openEditProForm(id: number) {
    if (!id) {
      console.error("Error: ID es undefined o null");
      return;
    }

    this.dialog.open(EditperfilComponent, {
      data: { idperfil: id },
      width: '500px'
    });
  }



  openDropProForm(id:number){

           this.api.eliminarPerfil(id).subscribe({
             next: (response) => {
               console.log(response);

               Swal.fire({
                 icon: 'success',
                 title: 'Éxito',
                 text: 'El registro se elimino correctamente',
                 confirmButtonText: 'Aceptar'
               }).then(() => {

                 window.location.reload(); // Recarga la página
               });
             },
             error: (error) => {
               console.error(error);
               Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Hubo un problema al eliminar el registro',
                 confirmButtonText: 'Aceptar'
               });
             }
           });

       }

  private obtenerPerfil(){
    this.api.getPerfilList().subscribe(dato=>{
          this.perfiles = dato;
          this.dataSource = new MatTableDataSource(dato);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
    })
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
