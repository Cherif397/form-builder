export default class MonInputText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }


  connectedCallback() {

    const label = this.getAttribute('label')
    const id = this.getAttribute('id')
    const name = this.getAttribute('name')
    const type = this.getAttribute('type')
    const onChange = this.getAttribute('onChange')

    this.shadowRoot.innerHTML = `
        
    <div class="">
      <label for="${id}">${label}</label>
      <input type="${type}" id="${id}" name="${name}" onchange="${onChange}">
    </div>
      `
    this.inputElement = this.shadowRoot.querySelector('input');
    this.inputElement.addEventListener('change', this.handleInputChange.bind(this));
  }

  get value() { return this.inputElement.value; }

  set value(newValue) { this.inputElement.value = newValue; }

  handleInputChange(event) {     
    const customEvent = new CustomEvent('change', { 
      bubbles: true,
      detail: event.target
    });
    this.dispatchEvent(customEvent);
  }
}

window.customElements.define('input-text', MonInputText)
