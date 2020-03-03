/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* Este es el reductor, acá se definen los tipos de datos, se le da forma al store y 
 * se define como las acciones lo modifican */

import { Reducer } from 'redux';
import {
  GET_USUARIOS, SET_USUARIO, UNSET_USUARIO
} from '../actions/usuarios.js';
import { RootAction } from '../store.js';

export interface UsuariosState {
  usuarios: ListaUsuarios;
  usuario: Usuario | null;
}

export interface ListaUsuarios {
  [index:string]: Usuario;
}

export interface Usuario {
  email: string;
  password: string;
}

const INITIAL_STATE: UsuariosState = {
  usuarios: {},
  usuario: null,
};

const usuarios: Reducer<UsuariosState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USUARIOS:
      return {
        ...state,
        usuarios: action.usuarios
      };
    case SET_USUARIO:
      return {
        ...state,
        usuario: action.usuario
      }
    case UNSET_USUARIO:
      return {
        ...state,
        usuario: null
      }
    default:
      return state;
  }
};

export default usuarios;
