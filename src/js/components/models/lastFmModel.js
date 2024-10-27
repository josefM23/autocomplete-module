/**
 * Class representing the Last.fm API model.
 * Provides methods to interact with the Last.fm API and retrieve track data.
 *
 * @class
 */
export class LastfmModel {
  #baseUrl = 'https://ws.audioscrobbler.com/2.0/' // Base URL for Last.fm API
  #apiKey

  /**
   * Creates an instance of the LastfmModel class.
   * Loads the API key from environment variables.
   *
   * @param {string} [apiKey] - The API key for Last.fm (defaults to the environment variable VITE_LASTFM_API_KEY).
   * @throws {Error} - Throws an error if the API key is missing.
   */
  constructor (apiKey = import.meta.env.VITE_LASTFM_API_KEY) {
    this.#apiKey = apiKey
    if (!this.#apiKey) {
      throw new Error('API key for Last.fm is not defined. Please check your environment variables.')
    }
  }

  /**
   * Fetches tracks based on a search query.
   *
   * @async
   * @param {string} query - The search query (e.g., song title or artist name).
   * @returns {Promise<Array>} - A promise that resolves to an array of track objects.
   * @throws {Error} - Throws an error if the query is invalid or if the API request fails.
   */
  async searchTracks (query) {
    this.#validateQuery(query)
    const url = this.#buildSearchUrl(query)

    try {
      const data = await this.#fetchData(url)
      return this.#extractTracks(data)
    } catch (error) {
      console.error('Error fetching data from Last.fm:', error)
      throw new Error(`Failed to fetch tracks from Last.fm: ${error.message}`)
    }
  }

  /**
   * Validates the search query.
   * Ensures the query meets minimum requirements before making the API request.
   *
   * @private
   * @param {string} query - The search query.
   * @throws {Error} - Throws an error if the query is invalid.
   */
  #validateQuery (query) {
    if (!query || query.length < 3) {
      throw new Error('Query must be at least 3 characters long.')
    }
  }

  /**
   * Builds the URL for the track search endpoint.
   *
   * @private
   * @param {string} query - The search query.
   * @returns {string} - The complete URL for the track search API request.
   */
  #buildSearchUrl (query) {
    return `${this.#baseUrl}?method=track.search&track=${encodeURIComponent(query)}&api_key=${this.#apiKey}&format=json`
  }

  /**
   * Makes a fetch request to the given URL and parses the response.
   *
   * @private
   * @async
   * @param {string} url - The URL to fetch data from.
   * @returns {Promise<object>} - The parsed JSON data from the response.
   * @throws {Error} - Throws an error if the response is not successful.
   */
  async #fetchData (url) {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }
    return response.json()
  }

  /**
   * Extracts and formats track information from the Last.fm API response.
   *
   * @private
   * @param {object} data - The raw API response data.
   * @returns {Array} - An array of formatted track objects.
   * @throws {Error} - Throws an error if the response structure is invalid.
   */
  #extractTracks (data) {
    if (!data.results?.trackmatches?.track) {
      throw new Error('Invalid response structure from Last.fm')
    }
    return data.results.trackmatches.track.map(track => ({
      artist: track.artist,
      name: track.name
    }))
  }
}
