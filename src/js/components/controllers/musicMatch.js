/**
 * Controller for handling the interaction between the search input and the Last.fm API.
 * It listens for user input, fetches data from Last.fm, and passes it to AutocompleteModule to display suggestions.
 *
 * @author Josef Matyasek
 * @version 1.0.0
 */

import { LastfmModel } from '../models/lastFmModel.js'
import { AutocompleteModule } from './autocomplete.js'

console.log('MusicMatchController is being loaded from musicMatch.js')

/**
 * The MusicMatchController class handles input from the search field and integrates with the Last.fm API to provide song and artist suggestions to the user.
 *
 * @class
 */
export class MusicMatchController {
  #inputElement
  #suggestionsElement
  #lastfmModel
  #autocompleteModule

  /**
   * Creates an instance of MusicMatchController.
   * Initializes the necessary elements and modules via Dependency Injection.
   *
   * @param {HTMLElement} inputElement - The input element where the user types search queries.
   * @param {HTMLElement} suggestionsElement - The element where the autocomplete suggestions will be displayed.
   * @param {LastfmModel} lastfmModel - The model for interacting with the Last.fm API.
   * @param {AutocompleteModule} autocompleteModule - The module for handling autocomplete suggestions.
   */
  constructor (inputElement, suggestionsElement, lastfmModel, autocompleteModule) {
    this.#inputElement = inputElement
    this.#suggestionsElement = suggestionsElement
    this.#lastfmModel = lastfmModel // Injected as a dependency (:
    this.#autocompleteModule = autocompleteModule // Injected as a dependency (:

    this.#init()
  }

  /**
   * Initializes the input event listener for user input.
   * This method attaches an event listener to monitor the search field.
   */
  #init () {
    this.#inputElement.addEventListener('input', () => this.#onUserInput())
  }

  /**
   * Handles the user input event.
   * If the input is valid, it fetches suggestions from Last.fm and updates the suggestions list.
   * If an error occurs during the fetch, it handles the error gracefully by clearing suggestions.
   */
  async #onUserInput () {
    const query = this.#getQuery()

    if (this.#isValidQuery(query)) {
      try {
        const suggestions = await this.#fetchSuggestions(query)
        this.#updateAutocompleteSuggestions(suggestions)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        // Rensa förslagen om det uppstår ett fel
        this.#clearAutocompleteSuggestions()
      }
    } else {
      this.#clearAutocompleteSuggestions()
    }
  }

  /**
   * Retrieves and trims the user's input from the search field.
   *
   * @returns {string} The trimmed input string.
   */
  #getQuery () {
    return this.#inputElement.value.trim()
  }

  /**
   * Validates the input query.
   * Checks if the input length is greater than or equal to 3 characters.
   *
   * @param {string} query - The user input to validate.
   * @returns {boolean} True if the query is valid, false otherwise.
   */
  #isValidQuery (query) {
    return query.length >= 3
  }

  /**
   * Fetches suggestions from the Last.fm API.
   *
   * @param {string} query - The search query entered by the user.
   * @returns {Promise<Array>} A promise that resolves to an array of suggestions.
   * @throws {Error} Throws an error if the fetch fails or the response is invalid.
   */
  async #fetchSuggestions (query) {
    const suggestions = await this.#lastfmModel.searchTracks(query)
    console.log('Suggestions from Last.fm:', suggestions)
    return suggestions
  }

  /**
   * Updates the AutocompleteModule with the fetched suggestions.
   *
   * @param {Array} suggestions - The list of suggestions fetched from the API.
   */
  #updateAutocompleteSuggestions (suggestions) {
    this.#autocompleteModule.updateSuggestionsList(
      suggestions.map(suggestion => `Artist: ${suggestion.artist} - Song: ${suggestion.name}`)
    )
  }

  /**
   * Clears the suggestions from the AutocompleteModule.
   */
  #clearAutocompleteSuggestions () {
    this.#autocompleteModule.clearSuggestions()
  }
}

/**
 * Factory function to create an instance of MusicMatchController.
 * Injects dependencies for LastfmModel and AutocompleteModule.
 *
 * @param {HTMLElement} inputElement - The input element where the user types search queries.
 * @param {HTMLElement} suggestionsElement - The element where the autocomplete suggestions will be displayed.
 * @returns {MusicMatchController} - The created instance of MusicMatchController.
 */
export function createMusicMatchController (inputElement, suggestionsElement) {
  // (Dependency injection)
  const lastfmModel = new LastfmModel()
  const autocompleteModule = new AutocompleteModule(inputElement, suggestionsElement)

  return new MusicMatchController(inputElement, suggestionsElement, lastfmModel, autocompleteModule)
}
