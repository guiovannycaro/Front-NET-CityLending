import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { AreasService } from '../../../services/areas.service';
import { Areas } from 'src/app/modelos/areas';

declare var $: any;


@Component({
  selector: 'app-editarea',
  templateUrl: './editarea.component.html',
  styleUrls: ['./editarea.component.css']
})
export class EditareaComponent implements OnInit {
  areaForm!: FormGroup;
  areas : Areas= new  Areas();
  areasar: Areas [] =[];


  constructor(
    private fb: FormBuilder,
    private api: AreasService,
    public dialogRef: MatDialogRef<EditareaComponent>,
    private cdr: ChangeDetectorRef,
    private routera: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Datos recibidos en el modal:', this.data);

    this.areaForm = this.fb.group({
      are_idcarea: [data?.are_idcarea ?? 0, Validators.required],
      are_description: [data?.are_description ?? '', Validators.required],
      are_status: [data?.are_status ?? true, Validators.required]
    });
  }

  ngOnInit(): void {

    this.areaForm.patchValue(this.data);

    const id = Number(this.data?.are_idcarea);
      console.log('envio parametros al update ',this.data);
      console.log('numero envio ',id);
        this.obtAreaById(id);


  }

  obtAreaById(id: number) {
    if (!id || isNaN(id)) {
      console.error('ID no válido:', id);
      return;
    }

    console.log('🔹 Enviando ID a la API:', id);

    this.api.getAreaById(id).subscribe({
      next: (response) => {
        console.log('🔹 Respuesta de la API:', response);


         this.areasar = response;




      },
      error: (err) => {
        console.error('❌ Error obteniendo área:', err);
      }
    });
  }

  editarArea(data: any) {
    this.api.actualizarAreas(data).subscribe({
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


    this.areasar.forEach((area, index) => {
      console.log(`Areas ${index + 1}:`, area);

      this.editarArea(area);
    });


  }

  closeDialog() {
    this.dialogRef.close();
  }
}
