import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ubicaciones } from 'src/app/modelos/ubicaciones';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';

@Component({
  selector: 'app-addubicacion',
  templateUrl: './addubicacion.component.html',
  styleUrls: ['./addubicacion.component.css']
})
export class AddubicacionComponent implements OnInit{

  ubicaciones : Ubicaciones = new Ubicaciones();

     constructor(private api:UbicacionesService,private router:Router) {}

     ngOnInit(): void {

     }

      guardarUbicaciones(){

          this.api.createUbicaciones(this.ubicaciones).subscribe({
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
        console.log(this.ubicaciones);
        this.guardarUbicaciones();
      }
}

