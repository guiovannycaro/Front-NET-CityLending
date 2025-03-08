import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Usuarios } from '../../../modelos/usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent  implements OnInit{


    usuForm!: FormGroup;

    usuarios : Usuarios = new Usuarios();

   constructor(
      private fb: FormBuilder,
      private api: UsuariosService,
      public dialogRef: MatDialogRef<AdduserComponent>,
      private router: Router,
      private route: ActivatedRoute

    ) {
      this.usuForm = this.fb.group({
        idusuario:[0, Validators.required],
        usu_nombre:['', Validators.required],
        usu_apellido:['', Validators.required],
        usu_idtipodocumento:[0, Validators.required],
        usu_numerodocumento:['', Validators.required],
        usu_direccion:['', Validators.required],
        usu_telefono:['', Validators.required],
        usu_ciudad:[0, Validators.required],
        usu_email:['', Validators.required],
        usu_contrasena:['', Validators.required],
        usu_cambiocontrasena :[true, Validators.required],
        usu_estado:[true, Validators.required]
      });
}

ngOnInit(): void {

}

 guardarUsuario(){
 if (this.usuForm.valid) {
      this.api.createUsuarios(this.usuForm.value).subscribe({
        next: (response) => {
          console.log(response);

          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El registro se ingresó correctamente',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.dialogRef.close(true);
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
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Completa los campos requeridos.',
        confirmButtonText: 'Aceptar'
      });
    }

  }


  onSubmit() {
    console.log(this.usuForm.value);
    this.guardarUsuario();
  }

  cerrarModal() {
    this.dialogRef.close();
    this.router.navigate(['dashboard/companias']);
  }

  closeDialog() {
    this.dialogRef.close();
  }





}
