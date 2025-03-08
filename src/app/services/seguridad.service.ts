import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  private url = "http://localhost:8090/lending/AppAdmin/";

  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json'
   })
 }

 constructor(private http:HttpClient) { }

 login(datos: any): Observable<any> {
  console.log("Enviando datos al servicio de autenticación:", datos);
  const direccion = `${this.url}Security/Autenticacion`;

  return this.http.post<any>(direccion, datos).pipe(
    catchError((error) => {
      console.error("Error en la solicitud de login:", error);
      return throwError(() => new Error("Error en la autenticación."));
    })
  );
}

obtenerPerfil(usuario: string): Observable<any> {
  console.log("Enviando datos al servicio de autenticación:", usuario);
  const direccion = `${this.url}Security/GetProfile`;

  return this.http.get<any>(direccion, { params: { datos: usuario } }).pipe(
    catchError((error) => {
      console.error("Error en la solicitud de obtener perfil:", error);
      return throwError(() => new Error("Error en al consultar el perfil."));
    })
  );
}


}
