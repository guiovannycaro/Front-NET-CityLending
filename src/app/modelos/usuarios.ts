export class Usuarios{
  idusuario: number;
  usu_nombre:string;
  usu_apellido:  string;
  usu_idtipodocumento: number;
  usu_numerodocumento:number;
  usu_direccion:string;
  usu_telefono:string;
  usu_ciudad: number;
  usu_email:string;
  usu_contrasena:string;
  usu_cambiocontrasena: boolean;
  usu_estado: boolean;



  constructor(){
  this.idusuario= 0;
  this.usu_nombre="";
  this.usu_apellido="";
  this.usu_idtipodocumento= 0;
  this.usu_numerodocumento=0;
  this.usu_direccion="";
  this.usu_telefono="";
  this.usu_ciudad= 0;
  this.usu_email="";
  this.usu_contrasena="";
  this.usu_cambiocontrasena= true;
  this.usu_estado= true;
  }

}
