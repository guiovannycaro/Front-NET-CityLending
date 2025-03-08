import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { map,catchError } from 'rxjs/operators';

import {Ubicaciones} from '../modelos/ubicaciones';
import {ResponceI} from '../modelos/ResponceI';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

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



  getUbicacionesList(): Observable<any>{
    let direccion = this.baseUrl + "Ubicaciones/GetAllLocations";
    let response = this.http.get<any>(direccion,this.httpOptions);
    console.log(response);
    return response;
  }

  createUbicaciones(usuarios: Ubicaciones): Observable<any>{
    let direccion = this.baseUrl + "Ubicaciones/InsertLocations";
    let response = this.http.post<any>(direccion,usuarios,this.httpOptions);

    return response;

   }



   actualizarUbicaciones(usuarios: Ubicaciones): Observable<any>{
    let direccion = this.baseUrl + "Ubicaciones/UpdateLocations";
    let response = this.http.post<any>(direccion,usuarios,this.httpOptions);
    console.log(response);
    return response;
   }

   eliminarUbicaciones(data:any): Observable<any>{

    console.log("parametro a enviar " + data)
    let direccion = this.baseUrl + "Ubicaciones/DeleteLocations?id=" + data;
    let response = this.http.get<any>(direccion);
    console.log(response);
    return response;
   }

   getUbicacionesById(data:any): Observable<any>{

    console.log("parametro a enviar " + data)
    let direccion = this.baseUrl + "Ubicaciones/FindLocationsById?id=" + data;
    let response = this.http.get<any>(direccion);
    console.log(response);
    return response;
   }


}
