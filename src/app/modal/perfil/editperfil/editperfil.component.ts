import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Perfil } from 'src/app/modelos/perfil';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilesService } from 'src/app/services/perfiles.service';
import { ChangeDetectorRef } from '@angular/core';


declare var $: any;

@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.component.html',
  styleUrls: ['./editperfil.component.css']
})
export class EditperfilComponent implements OnInit{

  perForm! : FormGroup;

  perfiles : Perfil = new Perfil();
  perfilesar: Perfil [] =[];

  constructor(
    private fb:FormBuilder,
    private api:PerfilesService,
    public dialogRef: MatDialogRef<EditperfilComponent>,
    private cdr: ChangeDetectorRef,
    private routera: ActivatedRoute,
    private router:Router,@Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('Datos recibidos en el modal:', this.data);

       this.perForm = this.fb.group({
        idperfil: [data?.idperfil ?? 0, Validators.required],
        descripcion: [data?.descripcion ?? '', Validators.required],
        estado: [data?.estado ?? true, Validators.required]
          });

  }

  ngOnInit(): void {
    this.perForm.patchValue(this.data);

    const id = Number(this.data?.idperfil);
      console.log('envio parametros al update ',this.data);
      console.log('numero envio ',id);
        this.obtPerfilById(id);



 }

 obtPerfilById(id: number) {
  if (!id || isNaN(id)) {
    console.error('ID no válido:', id);
    return;
  }

  console.log('🔹 Enviando ID a la API:', id);
  this.api.getPerfilById(id).subscribe({
    next: (response) => {
      console.log('🔹 Respuesta de la API:', response);
       this.perfilesar = response;
    },
    error: (err) => {
      console.error('❌ Error obteniendo área:', err);
    }
  });

 }


 editarPerfil(data: any) {
     this.api.actualizarPerfil(data).subscribe({
       next: (response) => {
         console.log(response);
         Swal.fire({
           icon: 'success',
           title: 'Éxito',
           text: 'El registro se actualizó correctamente',
           confirmButtonText: 'Aceptar'
         }).then(() => {
           this.dialogRef.close(true);
           this.recargarTabla(); // Recargar DataTable
         });
       },
       error: (error) => {
         console.error(error);
         Swal.fire({
           icon: 'error',
           title: 'Error',
           text: 'Hubo un problema al actualizar el registro',
           confirmButtonText: 'Aceptar'
         });
       }
     });
   }

   // Método para recargar DataTable
   recargarTabla() {
     setTimeout(() => {
       $('#dtBasicExample').DataTable().destroy(); // Destruye la instancia anterior
       $('#dtBasicExample').DataTable({
         retrieve: true, // Permite reutilizar la tabla
         paging: true,   // Habilita paginación
         searching: true // Habilita búsqueda
       });
       $('.dataTables_length').addClass('bs-select');
     }, 500); // Pequeño delay para asegurar que los datos se actualicen
   }


 onSubmit(){
  this.perfilesar.forEach((perfil, index) => {
    console.log(`Perfil ${index + 1}:`, perfil);

    this.editarPerfil(perfil);
  });
  }

}
