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
 * The MusicMatchController class handles input from the search field and integrates with the Last.fm API
 * to provide song and artist suggestions to the user.
 *
 * @class
 */
export class MusicMatchController {
  /**
   * Creates an instance of MusicMatchController.
   *
   * @param {HTMLElement} inputElement - The input element where the user types search queries.
   * @param {HTMLElement} suggestionsElement - The element where the autocomplete suggestions will be displayed.
   */
  constructor (inputElement, suggestionsElement) {
    this.inputElement = inputElement
    this.suggestionsElement = suggestionsElement
    this.lastfmModel = new LastfmModel()
    this.autocompleteModule = new AutocompleteModule(inputElement, suggestionsElement)

    this.init()
  }

  /**
   * Initializes the controller by attaching the input event listener.
   * This listener monitors the input field for changes and triggers the search logic.
   */
  init () {
    this.inputElement.addEventListener('input', () => this.onUserInput())
  }

  /**
   * Event handler for the user input in the search field.
   * If the input length is valid (greater than or equal to 3), it fetches matching tracks from Last.fm
   * and updates the AutocompleteModule with suggestions.
   */
  async onUserInput () {
    const query = this.inputElement.value.trim()

    if (query.length >= 3) {
      // Hämta låtar från Last.fm
      const suggestions = await this.lastfmModel.searchTracks(query)

      // Logga resultaten från API:et för att se vad som returneras
      console.log('Suggestions from Last.fm:', suggestions)

      // Sätt sökresultat i AutocompleteModule för att visa förslag
      this.autocompleteModule.setData(suggestions.map(suggestion => `Artist: ${suggestion.artist} - Song: ${suggestion.name}`))
    } else {
      this.autocompleteModule.clearSuggestions()
    }
  }
}

/**
 * Factory function to create an instance of MusicMatchController.
 *
 * @param {HTMLElement} inputElement - The input element where the user types search queries.
 * @param {HTMLElement} suggestionsElement - The element where the autocomplete suggestions will be displayed.
 * @returns {MusicMatchController} - The created instance of MusicMatchController.
 */
export function createMusicMatchController (inputElement, suggestionsElement) {
  return new MusicMatchController(inputElement, suggestionsElement)
}
