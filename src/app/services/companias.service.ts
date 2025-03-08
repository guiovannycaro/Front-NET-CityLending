import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import {ResponceI} from '../modelos/ResponceI';

import {Compania} from '../modelos/compania';
@Injectable({
  providedIn: 'root'
})
export class CompaniasService {


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

    getCompanyList(): Observable<any>{
      let direccion = this.baseUrl + "Company/GetAllCompany";
      let response = this.http.get<any>(direccion,this.httpOptions);
      console.log(response);
      return response;
    }

     createCompany(compania: Compania): Observable<any>{
        let direccion = this.baseUrl + "Company/InsertCompany";
        let response = this.http.post<any>(direccion,compania,this.httpOptions);

        return response;

       }

        actualizarCompany(compania: Compania): Observable<any>{
           let direccion = this.baseUrl + "Company/UpdateCompany";
           let response = this.http.post<any>(direccion,compania,this.httpOptions);
           console.log(response);
           return response;
          }

          eliminarCompany(data:any): Observable<any>{

            console.log("parametro a enviar " + data)
            let direccion = this.baseUrl + "Company/DeleteCompany?dato=" + data;
            let response = this.http.get<any>(direccion);
            console.log(response);
            return response;
           }


           getCompanyByName(data:any): Observable<any>{

            console.log("parametro a enviar " + data)
            let direccion = this.baseUrl + "Company/FindCompanyByName?dato=" + data;
            let response = this.http.get<any>(direccion);
            console.log(response);
            return response;
           }


           getCompanyById(data:any): Observable<any>{

            console.log("parametro a enviar " + data)
            let direccion = this.baseUrl + "Company/FindCompanyById?dato=" + data;
            let response = this.http.get<any>(direccion);
            console.log(response);
            return response;
           }
}
