export class Compania{
  com_idcompany: number;
  com_name: string;
  com_adress:string;
  com_doctype:number;
  com_number:number;
  com_idciudad:number;
  com_status:  boolean;
  com_AccessSchedule:boolean;
  constructor(){
    this.com_idcompany = 0;
    this.com_name = "";
    this.com_adress="";
    this.com_doctype=0;
    this.com_number=0;
    this.com_idciudad=0;

    this.com_status = true;
    this. com_AccessSchedule=true;
  }

}
