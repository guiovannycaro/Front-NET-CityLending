import { Component , Inject,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { perfilUsuario } from '../../modelos/perfilUsuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  perusu: perfilUsuario[] = [];
  perusud: perfilUsuario = new perfilUsuario();
    usuario: string | null = '';

    constructor(
      private _fb:FormBuilder,
      private api:UsuariosService,private router:Router,) {
      }

      ngOnInit() {
        this.usuario = sessionStorage.getItem('username');
        console.log('Usuario recuperado dasboard:', this.usuario);
        this.obtenerPerfilUsuario(this.usuario);

       }

       private obtenerPerfilUsuario(usuario: any){

        this.api.getUsuarioPerfil(usuario).subscribe(data=>{
          this.perusu =data;

         },error=> console.log(error));
      }

      logout() {
        localStorage.removeItem('username');
        this.router.navigate(['/index']);
      }
}
