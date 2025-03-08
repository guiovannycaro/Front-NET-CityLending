import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Areas } from '../../../modelos/areas';
import { AreasService } from '../../../services/areas.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.component.html',
  styleUrls: ['./addarea.component.css']
})
export class AddareaComponent implements OnInit {

  areaForm!: FormGroup;


  areas : Areas = new Areas();
  constructor(
    private fb: FormBuilder,
    private api: AreasService,
    public dialogRef: MatDialogRef<AddareaComponent>,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.areaForm = this.fb.group({
      are_idcarea: [0, Validators.required],
      are_description: ['', Validators.required],
      are_status: [true, Validators.required]
    });

  }

  ngOnInit(): void {

  }






  guardarArea() {
    if (this.areaForm.valid) {
      this.api.createAreas(this.areaForm.value).subscribe({
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
    console.log(this.areaForm.value);
    this.guardarArea();
  }

  cerrarModal() {
    this.dialogRef.close();
    this.router.navigate(['dashboard/areas']);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
