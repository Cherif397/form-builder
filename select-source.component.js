export default class SelectSource extends HTMLElement {
   
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.data = [];
  }

  connectedCallback() {
    this.render();
    this.loadData();
  }

  async loadData() {
    const url=this.getAttribute('url')
    // Chargez vos données JSON ici (par exemple, via une requête Ajax)
    try {
      const response = await fetch(`${url}`); // Remplacez par votre source de données
      const data = await response.json();
      this.data = data;
      this.populateSelect();
    } catch (error) {
      console.error('Erreur de chargement des données :', error);
    }
  }

  populateSelect() {
    const select = this.shadowRoot.querySelector('#custom-select');

    // Générez les options à partir des données JSON
    this.data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.value;
      option.textContent = item.label;
      select.appendChild(option);
    });
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
        <select id="custom-select">
          <!-- Les options seront générées dynamiquement par JavaScript -->
        </select>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
   
}

window.customElements.define('select-source',SelectSource)