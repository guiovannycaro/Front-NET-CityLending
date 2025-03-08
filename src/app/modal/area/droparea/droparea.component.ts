import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-droparea',
  templateUrl: './droparea.component.html',
  styleUrls: ['./droparea.component.css']
})
export class DropareaComponent {

   constructor(
      public dialogRef: MatDialogRef<DropareaComponent>,
      private router: Router
    ) {}

    cerrarModal() {
      this.dialogRef.close();
      this.router.navigate(['dashboard/areas']);
    }
}
