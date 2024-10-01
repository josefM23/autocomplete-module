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
    this.inputElement = inputElement
    this.suggestionsElement = suggestionsElement
    this.data = []

    // Attach event listener to the input field.
    this.inputElement.addEventListener('input', () => this.onInput())
  }

  /**
   * Sets the data for autocomplete suggestions.
   *
   * @param {Array} newData - The data array to use for suggestions.
   */
  setData (newData) {
    // Filter out any duplicates from the input data.
    const uniqueData = []
    for (const item of newData) {
      if (!uniqueData.includes(item.toLowerCase())) {
        uniqueData.push(item.toLowerCase())
      }
    }
    this.data = uniqueData
  }

  /**
   * Event handler for when the user types in the search field.
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
    // Version witch searches for suggestions that start with the input query.
    // search (query) {
    //  const suggestions = []
    //  for (const item of this.data) {
    //    // Use a case-insensitive search to match only if the item starts with the query.
    //    if (item.startsWith(query.toLowerCase())) {
    //      suggestions.push(item)
    //    }
    //  }

    // Sort suggestions alphabetically.
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
}
