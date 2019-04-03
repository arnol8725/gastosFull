import {MediaMatcher} from '@angular/cdk/Layout';
//import {MediaMatcher} from './media-matcher';
import { Component,ChangeDetectorRef } from '@angular/core';
import { GLOBAL } from './services/global';
import {datosCuentasServicio} from  './services/datosCuentaServicio';
import {datosGeneralesServicio} from './services/datosGeneralesServicio';
import {datosUrlServicio} from './services/datosURLServicio';
import {ProductoService} from './services/producto.service';
import {datosCuenta} from './models/DatosCuenta';
import {datosGenerales} from './models/datosGenerales';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogOverviewExampleDialog}  from './components/message';
import {menus} from './models/menus';




/*Componentes para el menu*/







@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductoService],
})
export class AppComponent {
  public title:string = 'Sistemas de Gastos';
  public header_color: string;
   public cuentas : datosCuenta;
   public datosGenerales : datosGenerales;
   carga:string;
   public noEmpl:Number;
   public funcionSAP: string;
   public estacion :string;
   public servidor :string;
   
   public mobileQuery: MediaQueryList;
   public mensaje: any;
   public error : boolean=false;
   public comentario: string;
   public titulos : string = "Alerta";
   public menus: string;
   public detMenus: string[];
   public ListaMenu: menus[]=[];
   public Menu:menus;
   public puestoRespaldo: any;


private _mobileQueryListener: () => void;
   
  constructor(private datosCuentasServicios: datosCuentasServicio,
              private datosGeneralesServicios: datosGeneralesServicio,
              private _productoService: ProductoService,
              
              private dialog: MatDialog,
              changeDetectorRef: ChangeDetectorRef,
             ){

  	this.header_color = GLOBAL.header_color;



  }


    cargaMenus(id):void {

      console.log('Entro cargaMenu'+id);

  //    this.datosGenerales.Puesto=632;

       if(this.datosGenerales.Puesto !== 632 ){

              if (id==1){
                  var menu =  new menus (1,"Reporte de Gastos","/productos");
                   this.ListaMenu.push(menu);

              }else if (id==2) {
                   var menu = new menus(2,"Reimpresión","/reimpresion");
                    this.ListaMenu.push(menu);
              }else if (id==3) {
                    var menu = new menus (3,"Solicitud","/solicitud");
                    this.ListaMenu.push(menu);

              }else if (id==4) {
                   var menu = new menus(4,"Finiquito","/finiquito");
                    this.ListaMenu.push(menu);
               }else if (id==5) {
                    var menu = new menus(5,"Autorización","/autorizacion");
                    this.ListaMenu.push(menu);
               }
              /* else if (id==6) {
                    var menu = new menus(6,"Egreso","/egreso");
                    this.ListaMenu.push(menu);
               }*/
               else if (id==6) {
                    var menu = new menus(7,"Comprobación","/comprobacion");
                    this.ListaMenu.push(menu);
               }

       }else{

             console.log('Valor del puesto');
             console.log(this.datosGenerales.Puesto);
           //Menus para la parte de egreso 
             if (id==1){
                  var menu =  new menus (6,"Ingreso","/ingresoADN"); //Opcion 1
                  this.ListaMenu.push(menu);

              }
              else if (id==2) {
                   var menu = new menus(7,"Egreso","/egresoADN"); //Opcion 2
                   this.ListaMenu.push(menu);
              }
              else if (id==3) {
                    var menu = new menus (8,"Cifra Control","/egreso");  //3 y 4 Este menu incluira pago al empleeado Gasolina
                    this.ListaMenu.push(menu);

              }else if (id==4) {
                   var menu = new menus(9,"JSA Cuenta 925","/egreso925"); //Opcion 5
                    this.ListaMenu.push(menu);
               }else if (id==5) {
                    var menu = new menus(10,"JSA Cuenta 1225","/egreso1225"); //Opcion 6
                    this.ListaMenu.push(menu);
                   // this.datosGenerales.Puesto=this.puestoRespaldo;

               }
       }

      
      

      console.log(this.ListaMenu);

  }


  	ngOnInit(){
 			//this.liga = window.location.href;
 			//alert(window.location.href);
      // localStorage.setItem("servidor", null);
			this.carga= this.getParameterByName('puesto');

			this.noEmpl= Number(this.getParameterByName('numempleado'));
      this.estacion= this.getParameterByName('ws');
      this.datosGenerales= new datosGenerales();
         this.servidor= this.getParameterByName('servidor'); 
         console.log(this.servidor);
         console.log(this.servidor);
         this.datosGenerales.servidor=this.servidor;
         console.log();
         this.datosGeneralesServicios.setServidor(this.servidor);
          this.datosGeneralesServicios.setEmpleado(String(this.noEmpl));



        // this.datosGeneralesServicios.addDatosGenerales(this.datosGenerales);
         

    //  alert(this.servidor);
      console.log('Servidor');   
      console.log(this.servidor);
      //localStorage.setItem("servidor", this.servidor);

  

		//	alert(this.carga);

		//	this.datosCuentasServicios.setPuesto(Number(this.carga));

     		this.cuentas = this.datosCuentasServicios.getDatosCuentas();

           this._productoService.getDatosGenerales(this.noEmpl).subscribe(
          result => {
        
                  //this.closeDialogCargar();
                    if(result.code != 200){
                      console.log('Metodo de la salida de datos generales');
                      console.log(result);
                      //this.cuentaGastos = result.data.detCuentas;


                      console.log(result.ObtenerDatosInicialesResult.EsError);
                         if (result.ObtenerDatosInicialesResult.EsError==false){
                                                            
                                 this.datosGenerales = result.ObtenerDatosInicialesResult.DatosInicio;



                              /*   this.datosGenerales.Ceco='524624'; //demo
                                 this.datosGenerales.CecoEnt=524624; //demo*/


                               console.log(this.datosGenerales);
                              this.datosGeneralesServicios.addDatosGenerales(this.datosGenerales);
                              this.datosGeneralesServicios.setEstacion(this.estacion);
                              this.datosGeneralesServicios.setServidor(this.servidor);
                               this.datosGeneralesServicios.setValorImpuesto(String(16)); // Pata pruebas
                            //   this.datosGeneralesServicios.setFrontera(this.datosGenerales.esfrontera);

                              console.log(this.datosGeneralesServicios.getDatosGenerales());
                              //this.menu=this.datosGenerales.Menu; 
                              if (this.datosGenerales.Puesto===634 || this.datosGenerales.Puesto===635 ){
                               // this.puestoRespaldo=this.datosGenerales.Puesto;
                                    this.datosGenerales.Puesto=632;
                                    this.datosGenerales.menu='1,2,3,4,5';
                                     this.datosGeneralesServicios.setValorPuesto(632);

                                     console.log('Paso con los puestos 634 y 635');
                                    
                              }

                              console.log('this.datosGenerales.menu');  
                              console.log(this.datosGenerales.menu);
                              this.detMenus= this.datosGenerales.menu.split(',');   
                              console.log(this.detMenus);

                               var self = this;
                              this.detMenus.forEach(function(i) {
                                    // self.ListaMenu= new Array[5];
                                    console.log(i);
                                    self.cargaMenus(i);
                              });

                                console.log('Menu ListaMenu');
                                console.log(this.ListaMenu);

                            
                              console.log('Valor de puesto'+this.datosGenerales.Puesto);
                              /*Se toma solo los 3 digiro de la derecha a izquierda*/

                                this.funcionSAP=String(this.datosGenerales.FuncionSAP).length==3?'0'+this.datosGenerales.FuncionSAP:String(this.datosGenerales.FuncionSAP).length==4?String(this.datosGenerales.FuncionSAP):'0000';
                                this.funcionSAP= String(this.funcionSAP).trim().substr(1, 4);


                             // this.datosCuentasServicios.setPuesto(this.datosGenerales.Puesto);
                                this.datosCuentasServicios.setPuesto(Number(this.funcionSAP));



                         }else{

                                this.titulos= "Error";
                                this.error=true;
                                this.comentario= "Error al consultar Datos de Inicio";
                                this.mensaje = {error:this.error,comentario:this.comentario,titulo:this.titulos};
                                  
                                  this.openDialog();
                                    console.log('Entro'+this.mensaje);

                         }
                              


                    }else{
                          /*this.titulos= "Error";
                          this.error=true;
                          this.comentario= "Error al consultar cuentas de gastos";
                          this.mensaje = {error:this.error,comentario:this.comentario,titulo:this.titulos};
                          this.openDialog();
                      console.log('Entro');*/
                      //this.cuentaGastos = result.detCuentas;
                      
                      console.log('Entro');

                    }

        },
        error => {
          console.log('');
        });


     		console.log('Valor de cuenta');
     		console.log(this.cuentas);

	}



   openDialog(): void {
    this.error=false;
      let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: { mensaje: this.mensaje },
      disableClose:true
    });
    }

  getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

}

