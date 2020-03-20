/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css, property, customElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { customCss } from './style';
import '@lit-element-bootstrap/alert/bs-alert.js';


// Importen sus tipos de datos y funciones
import { setUsuario } from '../actions/usuarios';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import './snack-bar.js';


// Aqui se importan los componentes.
import './horario-clases';

@customElement('log-in')
export class LogIn extends connect(store)(LitElement) {
  @property({type: String})
  private _emailUsuario ='';

  @property({type: String})
  private _passwordUsuario= '';

  
  static get styles() {
    return [customCss,
      css`
        .logInButton {
          cursor: pointer;
          border: 1px solid gray;
          border-radius: 4px;
          padding: 5px;
          background: aliceblue;
        }

        .logInButton:hover {
          background: aqua;
        }

        .component-margin {
          margin: 10% 10%
        }

        #footer {
          position: fixed;
          bottom: 0;
        }

        .a{
          margin-top: 5px;
          margin-bottom: 5px;
        }

        .container {
          display: grid;
          grid-template-columns: 1fr 3fr;
        }

        body {
          font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif; 
        }
        
      `
    ];
  }

  updateEmailUsuario(e:any) {
    this._emailUsuario = e.target.value;
  }

  updatePasswordUsuario(e:any) {
    this._passwordUsuario = e.target.value;
  }

  _logIn () {
    let logged = store.dispatch(setUsuario(this._emailUsuario, this._passwordUsuario));

    if (this._emailUsuario === ""){
      alert("Ingrese email")
    }else if (this._passwordUsuario === ""){
      alert("Ingrese contraseña")
    }else if (!logged){
      alert("Usuario o contraseña incorrecta");    
    }
  }

  protected render() {
    return html`
        <div class="container">
          <label class="a" for="email">
            Correo*    
          </label>
          <input class="a" id=“email” @change=${(e:any) => this.updateEmailUsuario(e)} name="email" type="email" required autocomplete="on"/>

          <label class="a" for="password">
            Contraseña*
          </label>
          <input class="a"  id="password" @change=${(e:any) => this.updatePasswordUsuario(e)} type="password" required autocomplete="off"/>

        </div>     
          <button @click="${this._logIn} class="LogInButton"/>Log In</button>
        
    `;
  }
}
