import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Perfil } from 'src/app/modelos/perfil';
import { PerfilesService } from 'src/app/services/perfiles.service';

@Component({
  selector: 'app-addperfil',
  templateUrl: './addperfil.component.html',
  styleUrls: ['./addperfil.component.css']
})
export class AddperfilComponent implements OnInit{

  perfiles : Perfil = new Perfil();

     constructor(private api:PerfilesService,private router:Router) {}

     ngOnInit(): void {

     }

      guardarPerfil(){

          this.api.createPerfil(this.perfiles).subscribe({
            next: (response) => {
              console.log(response);

              Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'El registro se ingresó correctamente',
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
                text: 'Hubo un problema al ingresar el registro',
                confirmButtonText: 'Aceptar'
              });
            }
          });

      }


      onSubmit(){
        console.log(this.perfiles);
        this.guardarPerfil();
      }
}
