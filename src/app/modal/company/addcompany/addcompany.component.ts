import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Compania } from '../../../modelos/compania';
import { CompaniasService } from '../../../services/companias.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit{

  comForm!: FormGroup;

  company : Compania = new Compania();

 constructor(
    private fb: FormBuilder,
    private api: CompaniasService,
    public dialogRef: MatDialogRef<CompaniasService>,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.comForm = this.fb.group({
      com_idcompany:[0, Validators.required],
      com_name:['', Validators.required],
      com_adress:['', Validators.required],
      com_doctype:[0, Validators.required],
      com_number:[0, Validators.required],
      com_idciudad:[0, Validators.required],
      com_status :[true, Validators.required],
      com_AccessSchedule:[true, Validators.required]
    });

  }

  ngOnInit(): void {

  }
  guardarCompany(){
 if (this.comForm.valid) {







      this.api.createCompany(this.comForm.value).subscribe({
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
    console.log(this.comForm.value);
    this.guardarCompany();
  }

  cerrarModal() {
    this.dialogRef.close();
    this.router.navigate(['dashboard/companias']);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
