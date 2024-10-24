/**
 * Controller for handling the interaction between the search input and the Last.fm API.
 * It listens for user input, fetches data from Last.fm, and passes it to AutocompleteModule to display suggestions.
 *
 * @author Josef Matyasek
 * @version 1.0.0
 */

import { LastfmModel } from '../models/lastFmModel.js'
import { AutocompleteModule } from './autocomplete.js'

/**
 * The MusicMatchController class is responsible for managing input interactions with Last.fm API
 * and passing the result to the AutocompleteModule.
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
   * @param {HTMLElement} inputElement - The input element where the user types search queries.
   * @param {HTMLElement} suggestionsElement - The element where the autocomplete suggestions will be displayed.
   * @param {LastfmModel} lastfmModel - The model for interacting with the Last.fm API.
   * @param {AutocompleteModule} autocompleteModule - The module for handling autocomplete suggestions.
   */
  constructor (inputElement, suggestionsElement, lastfmModel = new LastfmModel(), autocompleteModule = new AutocompleteModule(inputElement, suggestionsElement)) {
    this.#inputElement = inputElement
    this.#suggestionsElement = suggestionsElement
    this.#lastfmModel = lastfmModel
    this.#autocompleteModule = autocompleteModule

    this.#init()
  }

  /**
   * Initializes the input event listener.
   * This method attaches an event listener to monitor the search field for user input.
   */
  #init () {
    this.#inputElement.addEventListener('input', () => this.handleUserInput())
  }

  /**
   * Public method to handle user input, fetch suggestions, and update autocomplete.
   * Validates the query length, fetches suggestions from the Last.fm API, and updates the autocomplete.
   */
  async handleUserInput () {
    const query = this.#inputElement.value.trim()

    // Check if the input is valid (3 or more characters)
    if (query.length >= 3) {
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
   * Updates the autocomplete module with suggestions from Last.fm.
   *
   * @param {Array} suggestions - The list of suggestions from the API.
   */
  #updateAutocompleteSuggestions (suggestions) {
    const formattedSuggestions = suggestions.map(track => `Artist: ${track.artist} - Song: ${track.name}`)

    console.log('Formatted suggestions:', formattedSuggestions)

    this.#autocompleteModule.updateSuggestionsList(formattedSuggestions)
  }

  /**
   * Clears the autocomplete suggestions.
   */
  #clearAutocompleteSuggestions () {
    this.#autocompleteModule.clearSuggestions()
  }
}

/**
 * Factory function to create and initialize an instance of MusicMatchController.
 * This ensures that the necessary dependencies are injected when creating the controller.
 *
 * @param {HTMLElement} inputElement - The input element where the user types search queries.
 * @param {HTMLElement} suggestionsElement - The element where the autocomplete suggestions will be displayed.
 * @returns {MusicMatchController} - The created instance of MusicMatchController.
 */
export function createMusicMatchController (inputElement, suggestionsElement) {
  const lastfmModel = new LastfmModel() // Inject LastfmModel
  const autocompleteModule = new AutocompleteModule(inputElement, suggestionsElement) // Inject AutocompleteModule

  return new MusicMatchController(inputElement, suggestionsElement, lastfmModel, autocompleteModule)
}
