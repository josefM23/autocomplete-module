/**
 * Class representing the Last.fm API model.
 * This class provides methods to search for tracks and return results.
 *
 * @class
 */
export class LastfmModel {
  /**
   * Creates an instance of the LastfmModel class.
   * This constructor loads the API key from environment variables using Vite or process.env.
   *
   * @param {string} [apiKey] - The API key (loaded from environment variables if not provided).
   * @throws {Error} - Throws an error if the API key is missing.
   */
  constructor (apiKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_LASTFM_API_KEY) || process.env.VITE_LASTFM_API_KEY) {
    this.apiKey = apiKey

    // Kontrollera om API-nyckeln är definierad, annars kasta ett fel
    if (!this.apiKey) {
      throw new Error('API key for Last.fm is not defined. Please check your environment variables.')
    }

    this.baseUrl = 'https://ws.audioscrobbler.com/2.0/' // Base URL for Last.fm API
  }

  /**
   * Searches for tracks based on a user query.
   * Makes a request to the Last.fm API to search for tracks that match the input query string.
   * Throws an error if the query is too short or if the request fails.
   *
   * @async
   * @param {string} query - The search query (e.g., song title or artist name).
   * @returns {Promise<Array>} - A promise that resolves to an array of track objects.
   * @throws {Error} - Throws an error if the query is invalid or if the API request fails.
   */
  async searchTracks (query) {
    // Kontrollera om sökfrågan är giltig (minst 3 tecken)
    if (!query || query.length < 3) {
      throw new Error('Query must be at least 3 characters long')
    }

    // Bygg API-anropets URL med sökfrågan och API-nyckeln
    const url = `${this.baseUrl}?method=track.search&track=${query}&api_key=${this.apiKey}&format=json`

    try {
      const response = await fetch(url)
      // Kasta ett fel om nätverkssvaret inte är OK
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      // Hämta och logga svaret
      const data = await response.json()

      // Kontrollera om svaret har korrekt struktur
      if (!data.results || !data.results.trackmatches || !data.results.trackmatches.track) {
        throw new Error('Invalid response structure from Last.fm')
      }

      // Returnera en lista över spår med artist och låtnamn
      return data.results.trackmatches.track.map(track => ({
        artist: track.artist,
        name: track.name
      }))
    } catch (error) {
      // Logga och kasta ett fel om API-anropet misslyckas
      console.error('Error fetching data from Last.fm:', error)
      throw new Error(`Failed to fetch tracks from Last.fm: ${error.message}`)
    }
  }
}
