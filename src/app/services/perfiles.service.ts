import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import {ResponceI} from '../modelos/ResponceI';

import {Perfil} from '../modelos/perfil';
@Injectable({
  providedIn: 'root'
})
export class PerfilesService {


      private baseUrl = "http://localhost:8090/lending/AppAdmin/";
      id: number;

      constructor(private http: HttpClient) {
        this.id =0;
      }

      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

      getPerfilList(): Observable<any>{
        let direccion = this.baseUrl + "Profile/GetAllProfile";
        let response = this.http.get<any>(direccion,this.httpOptions);
        console.log(response);
        return response;
      }

       createPerfil(perfil: Perfil): Observable<any>{
       // http://localhost:8090/lending/AppAdmin/Profile/InsertProfile
          let direccion = this.baseUrl + "Profile/InsertProfile";
          let response = this.http.post<any>(direccion,perfil,this.httpOptions);

          return response;

         }

          actualizarPerfil(perfil: Perfil): Observable<any>{
             let direccion = this.baseUrl + "Profile/UpdateProfile";
             let response = this.http.post<any>(direccion,perfil,this.httpOptions);
             console.log(response);
             return response;
            }

            eliminarPerfil(data:any): Observable<any>{

              console.log("parametro a enviar " + data)
              let direccion = this.baseUrl + "Profile/DeleteProfile?dato=" + data;
              let response = this.http.get<any>(direccion);
              console.log(response);
              return response;
             }


             getPerfilByName(data:any): Observable<any>{

              console.log("parametro a enviar " + data)
              let direccion = this.baseUrl + "Profile/FindProfileByName?dato=" + data;
              let response = this.http.get<any>(direccion);
              console.log(response);
              return response;
             }


             getPerfilById(data:any): Observable<any>{

              console.log("parametro a enviar " + data)
              let direccion = this.baseUrl + "Profile/FindProfileById?dato=" + data;
              let response = this.http.get<any>(direccion);
              console.log(response);
              return response;
             }
}
