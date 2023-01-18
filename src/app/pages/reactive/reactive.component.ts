import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup;

  constructor( private fb: FormBuilder,
               private validadores: ValidadoresService) {
                
    this.crearFormulario()
   }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  inputNoValido( input: string ){
   return this.forma.get( input )?.invalid && this.forma.get( input )?.touched
  }

  provincia( input: string ) {
    return this.forma.get(`${input}.provincia`)?.invalid && this.forma.get(`${input}.provincia`)?.touched
  }

  
  ciudad( input: string ) {
    return this.forma.get(`${input}.ciudad`)?.invalid && this.forma.get(`${input}.ciudad`)?.touched
  }
  

  //sintaxis del objeto propiedad: ['valor por defecto','validadores sincronos',validadores asincronos]
                                         // sintaxis [validadores sincronos con 2 o mas validaciones , ...] 
  crearFormulario() {
    this.forma = this.fb.group({
      nombre  : ['',   Validators.required],
      apellido: ['',  [ Validators.required, this.validadores.noHerrera]],
      correo  : ['', [ Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$') ] ],
      //group aninado en el formulario
      direccion: this.fb.group({
        provincia  : ['', Validators.required],
        ciudad     : ['', Validators.required]
      }),
      //array dentro del formulario
      pasatiempos: this.fb.array([

      ])
    }) 
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('') );
  }
  borrarPasatiempo( i: number ){
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma)
  if ( this.forma.invalid) {
    this.forma.markAllAsTouched();
 }else this.forma.reset();
}


}
