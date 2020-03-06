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
        #logInButton {
          cursor: pointer;
          border: 1px solid gray;
          border-radius: 4px;
          padding: 5px;
          background: aliceblue;
        }

        #logInButton:hover {
          background: aqua;
        }

        .component-margin {
          margin: 10% 10%
        }

        #footer {
          position: fixed;
          bottom: 0;
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
    if (!logged)
        alert('Contraseña incorrecta');
  }

  protected render() {
    return html`
          <div class="field-wrap">
          <label>
            Correo<span class="req">*</span>
          </label>
          <input id=“email” @change=${(e:any) => this.updateEmailUsuario(e)} name="email" type="email"required autocomplete="on"/>
          </div> 
          
          <div class="field-wrap">
            <label>
              Contraseña<span class="req">*</span>
            </label>
            <input id="password" @change=${(e:any) => this.updatePasswordUsuario(e)} type="password"required autocomplete="off"/>
          </div>
          
          <button @click="${this._logIn} class="LogInButton"/>Log In</button>
        </div>       
    `;
  }
}
