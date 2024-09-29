/**
 * The HomeView component as a web component.
 * Displays the home page content.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

// Define template for the HomeView component.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .home {
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }
  </style>

  <div class="home">
    <h1>Welcome to the Home Page</h1>
    <slot name="autocomplete"></slot>
  </div>
`

// Define the custom element 'home-view'.
customElements.define('home-view',
/**
 * Represents a Home page.
 */
  class extends HTMLElement {
    /**
     * Creates an instance of HomeView.
     */
    constructor () {
      super()

      // Attach the shadow DOM and append the template.
      this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true))
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      // Logic that runs when HomeView is inserted into the DOM.
      console.log('HomeView component connected to the DOM')
    }
  }
)
