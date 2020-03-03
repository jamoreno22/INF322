/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* En este archivo se escriben las aciones que serán llamadas por la vista, en general se debería obtener
 * datos de una API, pero acá, como ejemplo están escritos directamente. */

import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store.js';
import { ListaUsuarios, Usuario } from '../reducers/usuarios';

export const GET_USUARIOS = 'GET_USUARIOS';
export const SET_USUARIO = 'SET_USUARIO';
export const UNSET_USUARIO = 'UNSET_USUARIO';

export interface ActionGetUsuarios extends Action<'GET_USUARIOS'> {usuarios: ListaUsuarios};
export interface ActionSetUsuario extends Action<'SET_USUARIO'> {usuario: Usuario|null};
export interface ActionUnsetUsuario extends Action<'UNSET_USUARIO'> {};

export type UsuariosAction = ActionGetUsuarios | ActionSetUsuario | ActionUnsetUsuario;

type ThunkResult = ThunkAction<void, RootState, undefined, UsuariosAction>;
type ThunkResultBool = ThunkAction<boolean, RootState, undefined, UsuariosAction>;

const USUARIOS_LIST = [
  { "email": 'prueba1@prueba.cl', "password": '111111'},
  { "email": 'prueba2@prueba.cl', "password": '222222'},
  { "email": 'prueba3@prueba.cl', "password": '333333'},
  { "email": 'prueba4@prueba.cl', "password": '444444'} 
];

export const getAllUsuarios: ActionCreator<ThunkResult> = () => (dispatch) => {
  const usuarios = USUARIOS_LIST.reduce((obj, usuario) => {
    obj[usuario.email] = usuario;
    return obj
  }, {} as ListaUsuarios);

  dispatch({
    type: GET_USUARIOS,
    usuarios
  });
};

/* Se agrega una accion para setear en el store el usuario logeado. */
export const setUsuario: ActionCreator<ThunkResultBool> = (username:string, password:string) => (dispatch) => {
  const usuarios = USUARIOS_LIST.reduce((obj, usuario) => {
    obj[usuario.email] = usuario;
    return obj
  }, {} as ListaUsuarios);

  let usuario = usuarios[username] ? (usuarios[username].password === password ? usuarios[username] : null) : null;

  dispatch({
    type: SET_USUARIO,
    usuario
  });
  
  return !!usuario;
}

export const unsetUsuario: ActionCreator<ThunkResultBool> = () => (dispatch) => {
    dispatch({
        type: UNSET_USUARIO
    });
    return true;
}
