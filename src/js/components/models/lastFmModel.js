/**
 * Class representing the Last.fm API model.
 * This class provides methods to search for tracks and return results.
 *
 * @class
 */
export class LastfmModel {
  /**
   * Creates an instance of the LastfmModel class.
   * This constructor initializes the API key by fetching it from environment variables and sets the base URL for the Last.fm API.
   *
   * @class
   * @property {string} apiKey - The API key used for authenticating requests to the Last.fm API. Retrieved from the environment variable `VITE_LASTFM_API_KEY`.
   * @property {string} baseUrl - The base URL for the Last.fm API requests, set to `'https://ws.audioscrobbler.com/2.0/'`.
   */
  constructor () {
    this.apiKey = import.meta.env.VITE_LASTFM_API_KEY // Hämta API-nyckeln från .env-filen
    this.baseUrl = 'https://ws.audioscrobbler.com/2.0/'
  }

  /**
   * Searches for tracks based on a user query.
   * Makes a request to the Last.fm API to search for tracks that match the input query string.
   * If the query is shorter than 3 characters, the method returns an empty array.
   *
   * @async
   * @param {string} query - The search query (e.g., song title or artist name).
   * @returns {Promise<Array>} - A promise that resolves to an array of track objects, each containing artist and song name. If the query is too short or there is an error, it returns an empty array.
   */
  async searchTracks (query) {
    if (!query || query.length < 3) {
      return []
    }

    const url = `${this.baseUrl}?method=track.search&track=${query}&api_key=${this.apiKey}&format=json`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      console.log('Track Matches:', data.results.trackmatches.track)

      return data.results.trackmatches.track.map(track => ({
        artist: track.artist,
        name: track.name
      }))
    } catch (error) {
      console.error('Error fetching data from Last.fm:', error)
      return []
    }
  }
}
