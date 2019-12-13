import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-listbox/paper-listbox";
import "@polymer/paper-item/paper-item";
import "@polymer/paper-styles/paper-styles";
import "@bit/marko-ignjatovic.biopolymer.bio-link/bio-link/bio-link-mixin";

/**
 * `bio-pathway-card`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class BioPathwayCard extends PolymerElement {
  static get properties() {
    return {
      /** The name of the pathway database. */
      type: {
        type: String,
        value: ""
      },

      /** The user-friendly name of the database. */
      name: {
        type: String,
        computed: "__computeName(type, databases)"
      },

      /** A map of database names and user-friendly names. */
      databases: {
        type: Map,
        value: null
      },

      /** An array of pathway items containing an id and a name. */
      model: {
        type: Array,
        value: []
      },

      /** A normalised model containing an Array<Object> where each object is the id, and name of the pathway. */
      __model: {
        type: Array,
        computed: "__computeModel(model)"
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --height: fit-content;
        }
        label {
          font-size: 0.9em;
          font-weight: 100;
        }
        paper-listbox {
          height: calc(var(--height) - 50px);
          max-height: 300px;
          overflow-y: scroll;
          @apply --shadow-elevation-2dp;
        }
        paper-item {
          font-size: 0.8em;
          color: #909090;
          border-bottom: 1px solid #cacaca;
        }
        .card {
          height: var(--height);
        }
      </style>

      <div class="card">
        <label>[[name]]</label>

        <paper-listbox on-iron-select="__handleSelected">
          <template is="dom-repeat" items="[[__model]]">
            <paper-item id="[[item.id]]">[[item.name]]</paper-item>
          </template>
        </paper-listbox>
      </div>
    `;
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
  }

  /**
   * This method gets the user-friendly name of the database so that it can be rendered
   * in the UI.
   * @param {String} name the name of the database as stored in the databases Map
   * @param {Map<String, String>} databases a map containing short database names
   *                                      mapped to user-friendly database names
   */

  __computeName(name, databases) {
    let realName = "";
    if (databases) {
      realName = databases.get(name);
    }
    return realName;
  }

  /**
   * The model stored in the database can either be an array or an object. This
   * method insures that regardless of the type of value stored at the node,
   * an array will always be returned and used.
   * @param {*} model either an Object or an Array
   */

  __computeModel(model) {
    let realModel = [];
    if (Array.isArray(model)) {
      realModel = model;
    } else {
      realModel.push({ id: model.id, name: model.name });
    }
    return realModel;
  }

  /**
   * This method is responsible for handling the user-click event.
   * @param {Event} e the event object
   */

  __handleSelected(e) {
    this.id = e.detail.item.id;
    this.useNewWindow = true;
    this._handleTap(e);
  }
}

customElements.define("bio-pathway-card", BioPathwayCard);
