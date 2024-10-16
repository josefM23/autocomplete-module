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
    if (!inputElement || !suggestionsElement) {
      throw new Error('Both input and suggestions elements must be provided.')
    }

    this.inputElement = inputElement
    this.suggestionsElement = suggestionsElement
    this.data = []

    // Attach event listener to the input field
    this.inputElement.addEventListener('input', () => this.onUserInput())
  }

  /**
   * Sets the data for autocomplete suggestions.
   *
   * @param {Array} newData - The data array to use for suggestions.
   */
  setData (newData) {
    if (!Array.isArray(newData)) {
      throw new TypeError('Data must be an array')
    }

    this.data = this.getUniqueLowercaseData(newData)
  }

  /**
   * Filters out duplicate data and ensures case-insensitivity.
   *
   * @param {Array} data - The data array to filter.
   * @returns {Array} - The unique, case-insensitive data array.
   */
  getUniqueLowercaseData (data) {
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
  onUserInput () {
    const query = this.inputElement.value.trim()

    if (this.isValidInput(query)) {
      this.searchSuggestions(query)
    } else {
      this.clearSuggestions()
    }
  }

  /**
   * Validates if the input query meets the required length.
   *
   * @param {string} query - The input value to validate.
   * @returns {boolean} - True if valid, false otherwise.
   */
  isValidInput (query) {
    // Check if input has at least 3 characters and contains only letters or numbers.
    return query.length >= 3 && /^[a-zA-Z0-9]+$/.test(query)
  }

  /**
   * Performs the search for matching suggestions based on the input query.
   *
   * @param {string} query - The current input value to search for.
   */
  searchSuggestions (query) {
    const filteredSuggestions = this.filterSuggestions(query)
    this.displayFilteredSuggestions(filteredSuggestions)
  }

  /**
   * Filters the data to match the query, returning matching suggestions.
   *
   * @param {string} query - The input value to filter suggestions by.
   * @returns {Array} - The list of matching suggestions.
   */
  filterSuggestions (query) {
    // Version that allows searching for any matching from start letter.
    // const suggestions = this.data.filter(item => item.startsWith(query.toLowerCase()))

    // Version that allows searching for any matching.
    const suggestions = this.data.filter(item => item.toLowerCase().includes(query.toLowerCase()))

    // Logga de filtrerade förslagen för att se om något matchar
    console.log('Filtered suggestions:', suggestions)

    suggestions.sort((a, b) => a.localeCompare(b))
    return suggestions
  }

  /**
   * Displays the filtered suggestions.
   *
   * @param {Array} suggestions - The filtered list of suggestions.
   */
  displayFilteredSuggestions (suggestions) {
    this.displaySuggestions(suggestions)
  }

  /**
   * Displays the matched suggestions in the suggestionsElement.
   *
   * @param {Array} suggestions - The list of matched suggestions.
   */
  displaySuggestions (suggestions) {
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
    console.log('Rendering suggestions:', suggestions) // Logga vad som renderas
    for (const suggestion of suggestions) {
      const li = this.createSuggestionElement(suggestion)
      this.suggestionsElement.appendChild(li)
    }
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

    if (suggestion.length === 0) {
      console.warn('Empty suggestion found')
    }

    // Lägg till en logg här för att se vad som faktiskt läggs till i DOM
    console.log('Appending suggestion to DOM:', li.textContent)

    li.addEventListener('click', () => this.handleSuggestionClick(suggestion))
    return li
  }

  /**
   * Handles the event when a suggestion is clicked.
   *
   * @param {string} suggestion - The selected suggestion.
   */
  handleSuggestionClick (suggestion) {
    if (!suggestion) {
      console.error('Invalid suggestion clicked')
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
    if (this.suggestionsElement.children.length > 0) {
      this.suggestionsElement.innerHTML = ''
    }
  }
}
