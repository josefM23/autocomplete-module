/**
 * Controller for handling interactions between the search input and the Last.fm API.
 * It listens for user input, fetches data from Last.fm, and passes it to AutocompleteModule to display suggestions.
 *
 * @author Josef Matyasek
 * @version 1.0.0
 */

import { LastfmModel } from '../models/lastFmModel.js'
import { AutocompleteModule } from './autocomplete.js'

/**
 * Manages user input interactions with the Last.fm API
 * and sends the results to the AutocompleteModule.
 *
 * @class MusicMatchController
 */
export class MusicMatchController {
  #inputElement
  #suggestionsElement
  #lastfmModel
  #autocompleteModule

  /**
   * Creates an instance of MusicMatchController.
   *
   * @param {HTMLElement} inputElement - The input element for user queries.
   * @param {HTMLElement} suggestionsElement - The element where autocomplete suggestions are displayed.
   * @param {LastfmModel} lastfmModel - Model for interacting with the Last.fm API.
   * @param {AutocompleteModule} autocompleteModule - Module for managing autocomplete suggestions.
   */
  constructor (inputElement, suggestionsElement, lastfmModel = new LastfmModel(), autocompleteModule = new AutocompleteModule(inputElement, suggestionsElement)) {
    this.#inputElement = inputElement
    this.#suggestionsElement = suggestionsElement
    this.#lastfmModel = lastfmModel
    this.#autocompleteModule = autocompleteModule

    this.#initialize()
  }

  /**
   * Sets up event listeners for user input.
   * Monitors the input field and triggers suggestion updates.
   *
   * @private
   */
  #initialize () {
    this.#inputElement.addEventListener('input', () => this.#handleUserInput())
  }

  /**
   * Handles user input, fetches suggestions from Last.fm, and updates autocomplete.
   * If the query is invalid or the API request fails, it clears suggestions.
   *
   * @private
   */
  async #handleUserInput () {
    const query = this.#inputElement.value.trim()

    if (this.#isValidQuery(query)) {
      try {
        const suggestions = await this.#lastfmModel.searchTracks(query)
        this.#updateAutocompleteSuggestions(suggestions)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        this.#clearAutocompleteSuggestions()
      }
    } else {
      this.#clearAutocompleteSuggestions()
    }
  }

  /**
   * Validates if the input query meets the minimum length for search.
   *
   * @private
   * @param {string} query - User input query.
   * @returns {boolean} - Returns true if valid, otherwise false.
   */
  #isValidQuery (query) {
    return query.length >= 3
  }

  /**
   * Formats and updates the autocomplete module with suggestions.
   *
   * @private
   * @param {Array} suggestions - List of suggestions from the API.
   */
  #updateAutocompleteSuggestions (suggestions) {
    const formattedSuggestions = suggestions.map(track => `Artist: ${track.artist} - Song: ${track.name}`)
    this.#autocompleteModule.updateSuggestionsList(formattedSuggestions)
  }

  /**
   * Clears the autocomplete suggestions.
   *
   * @private
   */
  #clearAutocompleteSuggestions () {
    this.#autocompleteModule.clearSuggestions()
  }
}

/**
 * Factory function for creating and initializing an instance of MusicMatchController.
 * Ensures necessary dependencies are injected when the controller is created.
 *
 * @param {HTMLElement} inputElement - The input element for user queries.
 * @param {HTMLElement} suggestionsElement - The element where autocomplete suggestions are displayed.
 * @returns {MusicMatchController} - The created instance of MusicMatchController.
 */
export function createMusicMatchController (inputElement, suggestionsElement) {
  const lastfmModel = new LastfmModel()
  const autocompleteModule = new AutocompleteModule(inputElement, suggestionsElement)

  return new MusicMatchController(inputElement, suggestionsElement, lastfmModel, autocompleteModule)
}
