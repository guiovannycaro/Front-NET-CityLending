import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

openEditPerForm(id: number){
  if (!id) {
    console.error('⚠️ Error: Se intentó abrir el modal con un valor undefined o null:', id);
    return;
  }

  this.router.navigate(['dashboard/perfEdit/', id]);


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



 eliminarPerfil(id:number){

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
    })
  }
}
