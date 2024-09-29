/**
 * The Autocomplete component.
 * Handles search input and suggestions functionality with additional validation and logic.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

// Define template for the Autocomplete component.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .autocomplete {
      width: 300px;
      margin: 20px auto;
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

  <div class="autocomplete">
    <input type="text" id="search" placeholder="Start typing...">
    <ul id="suggestions"></ul>
  </div>
`

/**
 * Creates an AutocompleteModule.
 */
export class AutocompleteModule extends HTMLElement {
  /**
   * Creates an instance of AutocompleteModule.
   */
  constructor () {
    super()
    // Attach the shadow DOM and append the template.
    this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true))

    // Initialize data array for suggestions.
    this.data = []

    // DOM elements
    this.inputElement = this.shadowRoot.querySelector('#search')
    this.suggestionsElement = this.shadowRoot.querySelector('#suggestions')

    // Attach event listener to the input field.
    this.inputElement.addEventListener('input', () => this.onInput())
  }

  /**
   * Sets the data for autocomplete suggestions.
   *
   * @param {Array} newData - The data array to use for suggestions.
   */
  setData (newData) {
    // Filter out any duplicates from the input data
    const uniqueData = []
    for (const item of newData) {
      if (!uniqueData.includes(item.toLowerCase())) {
        uniqueData.push(item.toLowerCase())
      }
    }
    this.data = uniqueData
  }

  /**
   * Event handler for when user types in the search field.
   * Starts searching when the input length is greater than or equal to 3.
   */
  onInput () {
    const query = this.inputElement.value.trim()

    // If input is invalid (e.g. empty, too short, contains only symbols), clear suggestions.
    if (query.length < 3 || !/^[a-zA-Z]+$/.test(query)) {
      this.clearSuggestions()
      return
    }

    this.search(query)
  }

  /**
   * Searches the data for matching suggestions based on the input value.
   *
   * @param {string} query - The current input value to search for.
   */
  search (query) {
    const suggestions = []
    for (const item of this.data) {
      // Use a case-insensitive search to match the query.
      if (item.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push(item)
      }
    }

    // Sort suggestions alphabetically
    suggestions.sort((a, b) => a.localeCompare(b))

    this.showSuggestions(suggestions)
  }

  /**
   * Displays the matched suggestions.
   *
   * @param {Array} suggestions - The list of matched suggestions.
   */
  showSuggestions (suggestions) {
    this.clearSuggestions()

    // If there are no suggestions, display a "no matches" message.
    if (suggestions.length === 0) {
      const li = document.createElement('li')
      li.textContent = 'No matches found'
      this.suggestionsElement.appendChild(li)
      return
    }

    // Loop over suggestions and display them in the list.
    for (const suggestion of suggestions) {
      const li = document.createElement('li')
      li.textContent = suggestion
      li.addEventListener('click', () => {
        this.inputElement.value = suggestion
        this.clearSuggestions()
      })
      this.suggestionsElement.appendChild(li)
    }
  }

  /**
   * Clears the current suggestions list.
   */
  clearSuggestions () {
    this.suggestionsElement.innerHTML = ''
  }

  /**
   * Called when the element is inserted into the DOM.
   */
  connectedCallback () {
    console.log('Autocomplete component connected to the DOM')
  }
}

// Define the 'autocomplete-module' custom element.
customElements.define('autocomplete-module', AutocompleteModule)
