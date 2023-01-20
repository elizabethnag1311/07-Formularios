//son una funcion que retorna un objeto

import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {


  constructor() { }

  existeUsuario( control: FormControl ): Promise< ErrorValidate > | Observable< ErrorValidate >{
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ( control.value === 'Goleman') {
          resolve({ existe:  true})
        }else {
          null
        }
      }, 3000);
    })
  }

  noHerrera( control: FormControl ): ErrorValidate {
    if (control.value?.toLowerCase() === 'herrera') {
      return{
        noHerrera: true
      }
    }
      return null;
  }

  validatePassword( control: FormControl ): { [s: string]: boolean } {
    if (control.value.indexOf(' ') >= 0) {
      return { 'passwordInvalid': true };
    }
    return null;
  }


  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
  
      if (pass1Control.value !== pass2Control.value) {
        pass2Control.setErrors({ noEsIgual: true });
      } else {
        pass2Control.setErrors(null);
      }
    }
  }
}




