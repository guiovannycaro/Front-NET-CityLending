import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { CompaniasService } from '../../../services/companias.service';
import { Compania } from 'src/app/modelos/compania';


declare var $: any;

@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.css']
})
export class EditcompanyComponent  implements OnInit {

    comForm!: FormGroup;
    company : Compania= new  Compania();
    companyar: Compania [] =[];

      constructor(
        private fb: FormBuilder,
        private api: CompaniasService,
        public dialogRef: MatDialogRef<EditcompanyComponent>,
        private cdr: ChangeDetectorRef,
        private routera: ActivatedRoute,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) {
        console.log('Datos recibidos en el modal:', this.data);

        this.comForm = this.fb.group({


          com_idcompany : [data?.com_idcompany ?? 0, Validators.required],
          com_name :  [data?.com_name ?? '', Validators.required],
          com_adress: [data?.com_adress ?? '', Validators.required],
          com_doctype:[data?.com_doctype ?? 0, Validators.required],
          com_number:[data?.com_number ?? 0, Validators.required],
          com_idciudad:[data?.com_idciudad ?? 0, Validators.required],
         com_status : [data?.are_status ?? true, Validators.required],
         com_AccessSchedule:[data?.are_status ?? true, Validators.required]

        });
      }

      ngOnInit(): void {

        this.comForm.patchValue(this.data);

        const id = Number(this.data?.com_idcompany);
          console.log('envio parametros al update ',this.data);
          console.log('numero envio ',id);
            this.obtComById(id);
      }

      obtComById(id: number) {
        if (!id || isNaN(id)) {
          console.error('ID no válido:', id);
          return;
        }

        console.log('🔹 Enviando ID a la API:', id);

        this.api.getCompanyById(id).subscribe({
          next: (response) => {
            console.log('🔹 Respuesta de la API:', response);
             this.companyar = response;
          },
          error: (err) => {
            console.error('❌ Error obteniendo área:', err);
          }
        });
      }



        comrArea(data: any) {
          this.api.actualizarCompany(data).subscribe({
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

  onSubmit() {
    this.companyar.forEach((co, index) => {
      console.log(`Co ${index + 1}:`, co);

      this.comrArea(co);
    });

  }

}
