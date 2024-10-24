/**
 * Class representing the Last.fm API model.
 * This class provides methods to search for tracks and return results.
 *
 * @class
 */
export class LastfmModel {
  /**
   * Creates an instance of the LastfmModel class.
   * This constructor laddar API-nyckeln från miljövariabler med Vite.
   *
   * @param {string} apiKey - API-nyckeln (från miljövariabler).
   */
  constructor (apiKey = import.meta.env.VITE_LASTFM_API_KEY) {
    this.apiKey = apiKey
    this.baseUrl = 'https://ws.audioscrobbler.com/2.0/'
  }

  /**
   * Searches for tracks based on a user query.
   * Makes a request to the Last.fm API to search for tracks that match the input query string.
   * Throws an error if the query is too short or if the request fails.
   *
   * @async
   * @param {string} query - The search query (e.g., song title or artist name).
   * @returns {Promise<Array>} - A promise that resolves to an array of track objects.
   */
  async searchTracks (query) {
    if (!query || query.length < 3) {
      throw new Error('Query must be at least 3 characters long')
    }

    const url = `${this.baseUrl}?method=track.search&track=${query}&api_key=${this.apiKey}&format=json`

    try {
      const response = await fetch(url)
      console.log('API response:', response) // Logga hela svaret, testning

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Fetched data:', data)

      if (!data.results || !data.results.trackmatches || !data.results.trackmatches.track) {
        throw new Error('Invalid response structure from Last.fm')
      }

      console.log('Trackmatches:', data.results.trackmatches)

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
