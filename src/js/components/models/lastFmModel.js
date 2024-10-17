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
    this.apiKey = import.meta.env.VITE_LASTFM_API_KEY // Fetch API key from environment variable.
    this.baseUrl = 'https://ws.audioscrobbler.com/2.0/' // Base URL for Last.fm API.
  }

  /**
   * Searches for tracks based on a user query.
   * Makes a request to the Last.fm API to search for tracks that match the input query string.
   * Throws an error if the query is too short or if the request fails.
   *
   * @async
   * @param {string} query - The search query (e.g., song title or artist name).
   * @returns {Promise<Array>} - A promise that resolves to an array of track objects, each containing artist and song name.
   * @throws {Error} - Throws an error if the query is shorter than 3 characters or if the network request fails.
   */
  async searchTracks (query) {
    if (!query || query.length < 3) {
      // Throw error if query is too short.
      throw new Error('Query must be at least 3 characters long')
    }

    const url = `${this.baseUrl}?method=track.search&track=${query}&api_key=${this.apiKey}&format=json`

    try {
      const response = await fetch(url)

      // Check if the response is ok, otherwise throw an error.
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      const data = await response.json()

      // Check if the data structure from the API response is valid.
      if (!data.results || !data.results.trackmatches || !data.results.trackmatches.track) {
        throw new Error('Invalid response structure from Last.fm')
      }

      console.log('Track Matches:', data.results.trackmatches.track)

      // Return the array of track objects with artist and name.
      return data.results.trackmatches.track.map(track => ({
        artist: track.artist,
        name: track.name
      }))
    } catch (error) {
      // Log and throw the error to be handled higher up.
      console.error('Error fetching data from Last.fm:', error)
      throw new Error(`Failed to fetch tracks from Last.fm: ${error.message}`)
    }
  }
}
