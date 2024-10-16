/**
 * The HomeView component as a web component.
 * Displays the home page content and renders the autocomplete UI for searching music-related content.
 *
 * Users can type in the search field to find songs, artists, or albums. The application will display
 * autocomplete suggestions based on the user's input, using data fetched from the Last.fm API.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

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

    .description {
      font-size: 16px;
      margin-bottom: 20px;
      max-width: 400px;
    }

    .autocomplete {
      width: 300px;
      margin-top: 20px;
    }

    input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      box-sizing: border-box;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      background-color: white;
      border: 1px solid #ccc;
      max-height: 150px;
      overflow-y: auto;
    }

    li {
      padding: 10px;
      cursor: pointer;
      color: black;
    }

    li:hover {
      background-color: #f0f0f0;
    }
  </style>

  <div class="home">
    <h1>Welcome to the Music Match application.</h1>
    <p class="description">
      Start typing in the search box below to find songs, artists, or albums. As you type, relevant suggestions 
      will appear based on your input. Use this tool to quickly discover music-related information.
    </p>
    <div class="autocomplete">
      <input type="text" id="search" placeholder="Start typing...">
      <ul id="suggestions"></ul>
    </div>
  </div>
`

customElements.define('home-view',
  /**
   * Called when the element is inserted into the DOM.
   * Attaches the shadow DOM and appends the template for rendering.
   */
  class extends HTMLElement {
    /**
     * Called when the element is inserted into the DOM.
     * Attaches the shadow DOM and appends the template for rendering.
     */
    connectedCallback () {
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  }
)
