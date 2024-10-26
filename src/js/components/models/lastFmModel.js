/**
 * Class representing the Last.fm API model.
 * This class provides methods to search for tracks and return results.
 *
 * @class
 */
export class LastfmModel {
  /**
   * Creates an instance of the LastfmModel class.
   * Loads the API key from environment variables.
   *
   * @param {string} [apiKey] - The API key for Last.fm (defaults to the environment variable VITE_LASTFM_API_KEY).
   * @throws {Error} - Throws an error if the API key is missing.
   */
  constructor (apiKey = import.meta.env.VITE_LASTFM_API_KEY) {
    this.apiKey = apiKey

    if (!this.apiKey) {
      throw new Error('API key for Last.fm is not defined. Please check your environment variables.')
    }

    this.baseUrl = 'https://ws.audioscrobbler.com/2.0/'
  }

  /**
   * Searches for tracks based on a user query.
   *
   * @async
   * @param {string} query - The search query (e.g., song title or artist name).
   * @returns {Promise<Array>} - A promise that resolves to an array of track objects.
   * @throws {Error} - Throws an error if the query is invalid or if the API request fails.
   */
  async searchTracks (query) {
    if (!query || query.length < 3) {
      throw new Error('Query must be at least 3 characters long')
    }

    const url = `${this.baseUrl}?method=track.search&track=${query}&api_key=${this.apiKey}&format=json`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.results || !data.results.trackmatches || !data.results.trackmatches.track) {
        throw new Error('Invalid response structure from Last.fm')
      }

      return data.results.trackmatches.track.map(track => ({
        artist: track.artist,
        name: track.name
      }))
    } catch (error) {
      console.error('Error fetching data from Last.fm:', error)
      throw new Error(`Failed to fetch tracks from Last.fm: ${error.message}`)
    }
  }
}
