import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ubicaciones } from 'src/app/modelos/ubicaciones';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { ChangeDetectorRef } from '@angular/core';
import { Compania } from 'src/app/modelos/compania';
import { Areas } from 'src/app/modelos/areas';
import { AreasService } from '../../../services/areas.service';
import { CompaniasService } from '../../../services/companias.service';
declare var $: any;

@Component({
  selector: 'app-editubicacion',
  templateUrl: './editubicacion.component.html',
  styleUrls: ['./editubicacion.component.css']
})
export class EditubicacionComponent implements OnInit{

  ubcForm! : FormGroup;

  ubicaciones: Ubicaciones = new Ubicaciones();
  ubicacionesar: Ubicaciones [] =[];
  companysar : Compania[]=[];
  areasar : Areas[] =[];

  constructor(
    private fb:FormBuilder,
    private api:UbicacionesService,
    private apiare:AreasService,
    private apicom:CompaniasService,
    public dialogRef: MatDialogRef<EditubicacionComponent>,
    private cdr: ChangeDetectorRef,
    private routera: ActivatedRoute,
    private router:Router,@Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('Datos recibidos en el modal:', this.data);

       this.ubcForm = this.fb.group({
        sch_idcompanylocation: [data?.sch_idcompanylocation ?? 0, Validators.required],
        sch_iduser: [data?.sch_iduser ?? 0, Validators.required],
        sch_area: [data?.sch_area ?? 0, Validators.required],
        sch_initialtime: [data?.sch_initialtime ?? '', Validators.required],
        sch_finaltime: [data?.sch_finaltime ?? '', Validators.required]
          });

  }

  ngOnInit(): void {
    this.ubcForm.patchValue(this.data);

    const id = Number(this.data?.sch_iduser);
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
  this.api.getUbicacionesById(id).subscribe({
    next: (response) => {
      console.log(' Respuesta de la API:', response);
       this.ubicacionesar = response;
    },
    error: (err) => {
      console.error(' Error obteniendo área:', err);
    }
  });

 }


 editarPerfil(data: any) {
     this.api.actualizarUbicaciones(data).subscribe({
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


   findCompanias(){
     this.apicom.getCompanyList().subscribe(dato => {
      console.log("Datos recibidos del backend:", dato);
      this.companysar = [...dato];
    });
   }

   findAreas(){
     this.apiare.getAreasList().subscribe(dato => {
       console.log("Datos recibidos del backend:", dato);
       this.areasar = [...dato];
     });
   }

 onSubmit(){
  this.ubicacionesar.forEach((ubica, index) => {
    console.log(`Ubica ${index + 1}:`, ubica);

    this.editarPerfil(ubica);
  });
  }

}
