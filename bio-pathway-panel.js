import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./bio-pathway-card";

/**
 * `bio-pathways-panel`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class BioPathwaysPanel extends PolymerElement {
  static get properties() {
    return {
      databases: {
        type: Map,
        value: function() {
          return new Map([
            ["kegg", "KEGG"],
            ["biocarta", "BioCarta"],
            ["netpath", "NetPath"],
            ["reactome", "Reactome"],
            ["pid", "PID"],
            ["humancyc", "HumanCyc"],
            ["wikipathways", "WikiPathways"]
          ]);
        }
      },

      databaseUrlMap: {
        type: Map,
        value: function() {
          return new Map([
            ["kegg", "KEGG"],
            ["biocarta", "BioCarta"],
            ["netpath", "NetPath"],
            ["reactome", "Reactome"],
            ["pid", "PID"],
            ["wikipathways", "WikiPathways"]
          ]);
        }
      },

      /** An array of database names. */
      databaseNames: {
        type: Array,
        computed: "__computeDatabaseNames(databases)"
      },

      model: {
        type: Object,
        value: null
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        fieldset {
          border-radius: 5px;
          border-color: var(--app-header-color);
          color: var(--app-header-color);

          @apply --layout-horizontal;
          @apply --layout-wrap;
        }

        bio-pathway-card {
          margin-top: 5px;
          width: 100%;
        }
      </style>

      <fieldset>
        <legend>Pathways</legend>

        <template is="dom-repeat" items="[[databaseNames]]">
          <template is="dom-if" if="{{__val(model, item)}}">
            <bio-pathway-card
              type="[[item]]"
              databases="[[databases]]"
              model="{{__val(model, item)}}"
            ></bio-pathway-card>
          </template>
        </template>
      </fieldset>
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
   * This method gets a user-friendly database name.
   * @param {Map<String, String>} databases the map of database abbreviations and names
   * @return {String} a user-friendly database name
   */

  __computeDatabaseNames(databases) {
    let names = [];
    for (let name of databases.keys()) {
      names.push(name);
    }
    return names;
  }

  __val(model, item) {
    let val = this.get(`model.${item}`);
    return val;
  }
}

customElements.define("bio-pathways-panel", BioPathwaysPanel);
