/**
 * The Autocomplete component logic.
 * Handles input, filtering, and suggestions.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

/**
 * The Autocomplete component logic.
 * Handles input, filtering, and suggestions.
 */
export class AutocompleteModule {
  /**
   * Creates an instance of AutocompleteModule.
   *
   * @param {HTMLElement} inputElement - The input element where the user types search queries.
   * @param {HTMLElement} suggestionsElement - The element where the autocomplete suggestions will be displayed.
   */
  constructor (inputElement, suggestionsElement) {
    if (!inputElement || !suggestionsElement) {
      throw new Error('Both input and suggestions elements must be provided.')
    }

    this.inputElement = inputElement
    this.suggestionsElement = suggestionsElement
    this.data = []

    this.inputElement.addEventListener('input', () => this.onUserInput())
  }

  /**
   * Updates the list of suggestions data.
   *
   * @param {Array} newData - The data array to use for suggestions.
   */
  updateSuggestionsList (newData) {
    if (!Array.isArray(newData)) {
      throw new TypeError('Data must be an array')
    }
    this.data = this.getUniqueLowercaseData(newData)
    console.log('Updated data for suggestions:', this.data) // Kontrollera att data uppdateras korrekt

    // Display suggestions immediately if input is already valid.
    const currentQuery = this.inputElement.value.trim()
    if (this.isValidInput(currentQuery)) {
      this.searchSuggestions(currentQuery)
    }
  }

  /**
   * Filters out duplicate data and ensures case-insensitivity.
   *
   * @param {Array} data - The data array to filter.
   * @returns {Array} - The unique, case-insensitive data array.
   */
  getUniqueLowercaseData (data) {
    return [...new Set(data.map(item => item.toLowerCase()))]
  }

  /**
   * Event handler for the search field.
   * Starts searching when the input length is greater than or equal to 3.
   */
  onUserInput () {
    const query = this.inputElement.value.trim()
    this.isValidInput(query) ? this.searchSuggestions(query) : this.clearSuggestions()
  }

  /**
   * Checks if the input query meets the required length and format.
   *
   * @param {string} query - The input value to validate.
   * @returns {boolean} - True if valid, false otherwise.
   */
  isValidInput (query) {
    return query.length >= 3 && /^[a-zA-Z0-9]+$/.test(query)
    // Checks if the `query` contains only alphanumeric characters (a-z, A-Z, 0-9) with no spaces or special characters.
  }

  /**
   * Performs the search for matching suggestions based on the input query.
   *
   * @param {string} query - The current input value to search for.
   */
  searchSuggestions (query) {
    const filteredSuggestions = this.filterSuggestions(query)
    this.displaySuggestions(filteredSuggestions)
  }

  /**
   * Filters the data to match the query.
   *
   * @param {string} query - The input value to filter suggestions by.
   * @returns {Array} - The list of matching suggestions.
   */
  filterSuggestions (query) {
    return this.data
      .filter(item => item.includes(query.toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
  }

  /**
   * Displays the matched suggestions in the DOM.
   *
   * @param {Array} suggestions - The list of matched suggestions.
   */
  displaySuggestions (suggestions) {
    this.clearSuggestions()
    if (suggestions.length) {
      console.log('Displaying suggestions:', suggestions) // Bekräfta att förslag renderas
      this.renderSuggestions(suggestions)
    } else {
      this.displayNoMatches()
    }
  }

  /**
   * Renders the suggestions in the DOM.
   *
   * @param {Array} suggestions - The list of matched suggestions to render.
   */
  renderSuggestions (suggestions) {
    suggestions.forEach(suggestion => {
      const li = this.createSuggestionElement(suggestion)
      this.suggestionsElement.appendChild(li)
    })
  }

  /**
   * Creates a suggestion list item element.
   *
   * @param {string} suggestion - The suggestion to create an element for.
   * @returns {HTMLElement} - The created list item element.
   */
  createSuggestionElement (suggestion) {
    const li = document.createElement('li')
    li.textContent = suggestion
    li.addEventListener('click', () => this.handleSuggestionClick(suggestion))
    return li
  }

  /**
   * Handles a suggestion click.
   *
   * @param {string} suggestion - The selected suggestion.
   */
  handleSuggestionClick (suggestion) {
    this.inputElement.value = suggestion
    this.clearSuggestions()
  }

  /**
   * Displays a message when no matches are found.
   */
  displayNoMatches () {
    const li = document.createElement('li')
    li.textContent = 'No matches found'
    this.suggestionsElement.appendChild(li)
  }

  /**
   * Clears the suggestions from the DOM.
   */
  clearSuggestions () {
    this.suggestionsElement.innerHTML = ''
  }
}
