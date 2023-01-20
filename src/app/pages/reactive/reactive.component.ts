import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { __values } from 'tslib';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  public forma!: FormGroup;

  constructor( private fb: FormBuilder,
               private validadores: ValidadoresService) {
                
    this.crearFormulario();
    this.crearListeners();
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

  
  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 )? false : true
  }
  
  //sintaxis del objeto propiedad: ['valor por defecto','validadores sincronos',validadores asincronos]
                                         // sintaxis [validadores sincronos con 2 o mas validaciones , ...] 
  crearFormulario() {
    this.forma = this.fb.group({
      nombre  : ['',   Validators.required ],
      apellido: ['', [ Validators.required  , this.validadores.noHerrera]],
      correo  : ['', [ Validators.required  , Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$') ] ],
      usuario : ['',   Validators.required , this.validadores.existeUsuario],
      pass1   : ['', [ Validators.required  , Validators.minLength(8)] ],
      pass2   : ['',   Validators.required ],
      //group aninado en el formulario
      direccion: this.fb.group({
        provincia  : ['', Validators.required],
        ciudad     : ['', Validators.required]
      }),
      //array dentro del formulario
      pasatiempos: this.fb.array([])
    }, {
      Validators: [this.validadores.passwordsIguales('pass1','pass2'),this.validadores.validatePassword]
    });
  }

  crearListeners(){
    this.forma.valueChanges.subscribe( valor => { console.log( valor )});
    this.forma.statusChanges.subscribe( status => { console.log( {status} )});
    this.forma.get( 'nombre' ).valueChanges.subscribe(console.log)
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
