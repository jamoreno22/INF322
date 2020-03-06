/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* Esta es la página principal, usenla para probar sus componenetes, la idea es que aquí se hagan las modificaciones en
 * memoria y se envien datos a los componentes. El código actualmente está con un ejemplo del listado de cursos */

import { LitElement, html, css, property, PropertyValues, customElement } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { store, RootState } from '../store.js';
import { customCss } from './style';

// Importen sus tipos de datos y funciones
import { getAllCursos } from '../actions/cursos';
import { ListaCursos } from '../reducers/cursos';

import { unsetUsuario } from '../actions/usuarios';
import { Usuario } from '../reducers/usuarios';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState
} from '../actions/app.js';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import './snack-bar.js';

// Aqui se importan los componentes.
import './horario-clases';
import './log-in';

@customElement('main-page')
export class MainPage extends connect(store)(LitElement) {
  @property({type: Object})
  private _cursos: ListaCursos = {};

  @property({type: Object})
  private _usuario: Usuario | null = null;

  @property({type: String})
  private _page: string = '';

  private appTitle : string = 'Siga';
  
  static get styles() {
    return [customCss,
      css`
        :host {
          display: block;
          height: 100vh;
        }

        #main {
          display: grid;
          height: 100%;
          grid-template-columns: 300px calc(100% - 300px);
          grid-template-rows: 80px calc(100% - 160px) 80px;
        }

        #header {
          position: static;
          background-color: #0d1e52;
          text-align: left;
          color: white;
          padding: 2%;
          grid-row: 1;
          grid-column: 1 / 3;
        }

        #nav-bar {
          grid-row: 2;
          grid-column: 1;
        }

        #content {
          position: static;
          width: 100vw;
          background-image: linear-gradient(#0d1e52, white, #faba25);
          align-content: center;
          vertical-align: center;
        }

        #box {  
          position: static;
          margin-top: 80px;
          background-color: #05adff21;
          padding: 10px;
          width: 320px;
          margin-left: auto;
          margin-right: auto;
          border: 2px solid #2f2020;
          border-radius: 5px;
        }

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

        #footer {
        position: fixed;
        bottom: 0;
        background-color: #faba25;
        align-content: center;
        text-align: right;
        box-sizing: border-box;
        width: 100%;
        text-align: left;
        padding:10px 15px;
        }

        #footer-content{
          
        }

        .centered {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .component-margin {
          margin: 10% 10%
        }
        
      `
    ];
  }

  _logOut () {
    store.dispatch(unsetUsuario());
  }

  /* Render se ejecuta cada vez que se modifica una variable marcada como property, OJO: no se verifican las
   * subpropiedades de los objetos, pueden requerir una actualización usando this.requestUpdate();
   * Más info: https://polymer-library.polymer-project.org/3.0/docs/devguide/observers */
  protected render() {
    /* Acá está la página principal, cada componente debería tener un lugar donde puedan probarlo. */
    return html`
    ${this._usuario ? html`
    <div id="main">
        <div id="header" style="vertical-align: middle;">
            Sesión de ${this._usuario.email}
            <button style="align: right;" @click="${this._logOut} class="button button-block"/>Log Out</button>

        </div>
           
        <div id="content">
            <!-- ACA está la utilización del componente, para pasarle datos usen un punto '.' más
                 el nombre de la variable del componente (public) -->
            <horario-clases class="component-margin" .cursos="${this._cursos}"></horario-clases> 
        </div>
        
        
        <div id="footer">
        <ul class="footer-links">
          <li><a>Universidad Técnica Federico Santa María</a></li>
          <li><a>Contacto: +56 32 2654000 · dgc@usm.cl</a></li>
          <li><a>Dirección: Avenida España 1680, Valparaíso </a></li>
        </ul>
        </div>
        
    </div>
    ` : html` 
    <div id="main">
        <div id="header" style="vertical-align: middle;">
          <img src="../images/escudo.png" alt="escudoUSM" height="70px">
        </div>
                      
        <div id="content">
          <div id="box">
            <h1>Bienvenido!</h1>
            <log-in></log-in>
          </div>
        </div>

        
        <div id="footer">
        <ul class="footer-links">
          <li><a>Universidad Técnica Federico Santa María</a></li>
          <li><a>Contacto: +56 32 2654000 · dgc@usm.cl</a></li>
          <li><a>Dirección: Avenida España 1680, Valparaíso </a></li>
        </ul>
        </div>
        
    </div>
          `}
    `;
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  /* Esta función se ejecuta solo una vez, util para cargar datos. */
  protected firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
        () => store.dispatch(updateDrawerState(false)));

    // Cargando datos
    store.dispatch(getAllCursos());
  }

  /* Esta función se ejecuta DESPUES de cada render. */
  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
    /* Si queremos modificar la página o leer el contenido que hay en algún input debemos trabajar 
     * directamente con el DOM element. PERO cada elemento tiene su propio shadowRoot, por lo que 
     * para tomar algo de la página, por ejemplo la barra de navegación podemos: 
        let navBar = this.shadowRoot.getElementById('nav-bar');
     * Así tenemos la navBar, si fuera un input podríamos leerlo con navBar.value */
  }

  /* Esta función se ejecuta cada vez que el state cambia, se usa para leer la memoria. */
  stateChanged(state: RootState) {
    this._page = state.app!.page;
    this._cursos = state.cursos!.cursos;
    this._usuario = state.usuarios!.usuario;
  }
}
