import { Injectable } from '@angular/core';


import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { tap,map , catchError} from 'rxjs/operators';
import {ResponceI} from '../modelos/ResponceI';

import {Areas} from '../modelos/areas';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

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

  getAreasList(): Observable<any>{
    let direccion = this.baseUrl + "Area/GetAllAreas";
    let response = this.http.get<any>(direccion,this.httpOptions);
    console.log('respuesta ',response);
    return response;
  }

   createAreas(areas: Areas): Observable<any>{

      let direccion = this.baseUrl + "Area/InsertAreas";
      let response = this.http.post<any>(direccion,areas,this.httpOptions);

      return response;

     }

      actualizarAreas(areas: Areas): Observable<any>{
         let direccion = this.baseUrl + "Area/UpdateAreas";
         let response = this.http.post<any>(direccion,areas,this.httpOptions);
         console.log(response);
         return response;
        }

        eliminarArea(data:number): Observable<any>{

          console.log("parametro a enviar " + data)
          let direccion = this.baseUrl + "Area/DeleteAreas?dato=" + data;
          let response = this.http.get<any>(direccion);
          console.log(response);
          return response;
         }


         getAreaByName(data:any): Observable<any>{

          console.log("parametro a enviar " + data)
          let direccion = this.baseUrl + "Area/FindAreasByName?dato=" + data;
          let response = this.http.get<any>(direccion);
          console.log(response);
          return response;
         }


         getAreaById(data:any): Observable<any>{

          console.log("parametro a enviar " + data)
          let direccion = this.baseUrl + "Area/FindAreasById?dato=" + data;

          console.log("direccion " + direccion)
          let response = this.http.get<any>(direccion).pipe(
            tap((response: any) => console.log("✅ Respuesta del servidor:", response))
          );
          console.log(response);
          return response;
         }

}
