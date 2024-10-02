/**
 * The Autocomplete component logic.
 * Handles input, filtering, and suggestions.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Represents the core logic of the AutocompleteModule.
 * Handles user input, filtering suggestions, and displaying the matching results.
 *
 * @class AutocompleteModule
 */
export class AutocompleteModule {
  /**
   * Creates an instance of AutocompleteModule.
   *
   * @param {HTMLElement} inputElement - The input element where the user types search queries.
   * @param {HTMLElement} suggestionsElement - The element where the autocomplete suggestions will be displayed.
   */
  constructor (inputElement, suggestionsElement) {
    if (!inputElement || !suggestionsElement) { // New validation statement
      throw new Error('Both input and suggestions elements must be provided.')
    }

    this.inputElement = inputElement
    this.suggestionsElement = suggestionsElement
    this.data = []

    // Attach event listener to the input field.
    this.inputElement.addEventListener('input', () => this.handleInput())
  }

  /**
   * Sets the data for autocomplete suggestions.
   *
   * @param {Array} newData - The data array to use for suggestions.
   */
  setData (newData) {
    if (!Array.isArray(newData)) { // Additional check to ensure the input is an array
      throw new TypeError('Data must be an array')
    }

    this.data = this.filterUniqueData(newData)
  }

  /**
   * Filters out duplicate data and ensures case-insensitivity.
   *
   * @param {Array} data - The data array to filter.
   * @returns {Array} - The unique, case-insensitive data array.
   */
  filterUniqueData (data) {
    const uniqueData = []
    for (const item of data) {
      const lowerCaseItem = item.toLowerCase()
      if (!uniqueData.includes(lowerCaseItem)) {
        uniqueData.push(lowerCaseItem)
      }
    }
    return uniqueData
  }

  /**
   * Event handler for when the user types in the search field.
   * Starts searching when the input length is greater than or equal to 3.
   */
  handleInput () {
    const query = this.inputElement.value.trim()

    // Kolla att query är minst 3 tecken och innehåller bara bokstäver.
    if (query.length >= 3 && /^[a-zA-Z]+$/.test(query)) {
      this.performSearch(query)
    } else {
      this.clearSuggestions()
    }
  }

  /**
   * Performs the search for matching suggestions based on the input query.
   *
   * @param {string} query - The current input value to search for.
   */
  performSearch (query) {
    const filteredSuggestions = this.filterSuggestions(query)
    this.showSuggestions(filteredSuggestions)
  }

  /**
   * Filters the data to match the query, returning matching suggestions.
   *
   * @param {string} query - The input value to filter suggestions by.
   * @returns {Array} - The list of matching suggestions.
   */
  filterSuggestions (query) {
    // const suggestions = this.data.filter(item => item.startsWith(query.toLowerCase()))

    // Version that allows searching for any matching part of the string
    const suggestions = this.data.filter(item => item.toLowerCase().includes(query.toLowerCase()))

    suggestions.sort((a, b) => a.localeCompare(b))
    return suggestions
  }

  /**
   * Displays the matched suggestions in the suggestionsElement.
   *
   * @param {Array} suggestions - The list of matched suggestions.
   */
  showSuggestions (suggestions) {
    this.clearSuggestions()

    if (suggestions.length === 0) {
      this.displayNoMatches()
      return
    }

    this.renderSuggestions(suggestions)
  }

  /**
   * Renders the suggestions in the DOM.
   *
   * @param {Array} suggestions - The list of matched suggestions to render.
   */
  renderSuggestions (suggestions) {
    for (const suggestion of suggestions) {
      const li = document.createElement('li')
      li.textContent = suggestion

      if (suggestion.length === 0) { // Handle empty string as a suggestion
        console.warn('Empty suggestion found') // New warning statement
      }

      li.addEventListener('click', () => this.handleSuggestionClick(suggestion))
      this.suggestionsElement.appendChild(li)
    }
  }

  /**
   * Handles the event when a suggestion is clicked.
   *
   * @param {string} suggestion - The selected suggestion.
   */
  handleSuggestionClick (suggestion) {
    if (!suggestion) { // Check for empty or null suggestion
      console.error('Invalid suggestion clicked') // New error log
      return
    }

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
   * Clears the current suggestions list from the DOM.
   */
  clearSuggestions () {
    if (this.suggestionsElement.children.length > 0) { // Check before clearing
      this.suggestionsElement.innerHTML = ''
    }
  }
}
