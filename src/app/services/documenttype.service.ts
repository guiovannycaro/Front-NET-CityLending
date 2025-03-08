import { Injectable } from '@angular/core';


import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import {ResponceI} from '../modelos/ResponceI';

import {DocumentType} from '../modelos/documenttype';

@Injectable({
  providedIn: 'root'
})
export class DocumenttypeService {


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

       getDocumentTypelList(): Observable<any>{
         let direccion = this.baseUrl + "DocumType/GetAllDocuments";
         let response = this.http.get<any>(direccion,this.httpOptions);
         console.log(response);
         return response;
       }

        createDocumentType(doct: DocumentType): Observable<any>{
           let direccion = this.baseUrl + "DocumType/InsertDocuments";
           let response = this.http.post<any>(direccion,DocumentType);

           return response;

          }

           actualizarDocumentType(doct: DocumentType): Observable<any>{
              let direccion = this.baseUrl + "DocumType/UpdateDocuments";
              let response = this.http.post<any>(direccion,DocumentType);
              console.log(response);
              return response;
             }

             eliminarDocumentType(data:any): Observable<any>{

               console.log("parametro a enviar " + data)
               let direccion = this.baseUrl + "DocumType/DeleteDocuments?dato=" + data;
               let response = this.http.get<any>(direccion);
               console.log(response);
               return response;
              }


              getDocumentTypeByName(data:any): Observable<any>{

               console.log("parametro a enviar " + data)
               let direccion = this.baseUrl + "DocumType/FindDocumentsByName?dato=" + data;
               let response = this.http.get<any>(direccion);
               console.log(response);
               return response;
              }


              getDocumentTypeById(data:any): Observable<any>{

               console.log("parametro a enviar " + data)
               let direccion = this.baseUrl + "DocumType/FindDocumentsById?dato=" + data;
               let response = this.http.get<any>(direccion);
               console.log(response);
               return response;
              }
 }

