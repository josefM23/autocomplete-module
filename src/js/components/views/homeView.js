/**
 * The HomeView component as a web component.
 * Displays the home page content using a class-based approach.
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
      text-align: center;
      margin-top: 50px;
    }
  </style>
  <div class="home">
    <h1>Welcome to the Home Page</h1>
    <p>Enjoy exploring the app!</p>
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
