/**
 * Tests for the MusicMatchController with LastfmModel integration.
 * Ensures proper error handling and synchronization with mocked LastfmModel.
 *
 * @version 1.0.2
 */

import { MusicMatchController } from '../src/js/components/controllers/musicMatch.js'
import { LastfmModel } from '../src/js/components/models/lastFmModel.js'
import { jest } from '@jest/globals'

describe('MusicMatchController', () => {
  let inputElement
  let suggestionsElement
  let musicMatchController

  beforeAll(() => {
    process.env.VITE_LASTFM_API_KEY = 'mocked-api-key'

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          results: {
            trackmatches: {
              track: [
                { artist: 'Test Artist 1', name: 'Track 1' },
                { artist: 'Test Artist 2', name: 'Track 2' }
              ]
            }
          }
        })
      })
    )
  })

  afterAll(() => {
    global.fetch.mockClear()
    delete global.fetch
  })

  beforeEach(() => {
    inputElement = document.createElement('input')
    suggestionsElement = document.createElement('ul')
    const lastfmModel = new LastfmModel(process.env.VITE_LASTFM_API_KEY)
    musicMatchController = new MusicMatchController(inputElement, suggestionsElement, lastfmModel)
  })

  test('should fetch and display suggestions on valid input', async () => {
    inputElement.value = 'test'

    await musicMatchController.triggerUserInput()

    expect(suggestionsElement.children.length).toBe(2)
    expect(suggestionsElement.children[0].textContent.toLowerCase()).toBe('artist: test artist 1 - song: track 1')
    expect(suggestionsElement.children[1].textContent.toLowerCase()).toBe('artist: test artist 2 - song: track 2')
  })

  test('should handle API errors gracefully', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network Error')))

    inputElement.value = 'test'

    await expect(musicMatchController.triggerUserInput()).rejects.toThrow(
      'Failed to fetch suggestions: Failed to fetch tracks from Last.fm: Failed to fetch data from Last.fm: Network Error'
    )

    expect(suggestionsElement.children.length).toBe(0)
  })

  test('should handle invalid API response gracefully', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      })
    )

    inputElement.value = 'test'

    await expect(musicMatchController.triggerUserInput()).rejects.toThrow(
      'Failed to fetch suggestions: Failed to fetch tracks from Last.fm: Invalid response structure from Last.fm'
    )

    expect(suggestionsElement.children.length).toBe(0)
  })

  test('should clear suggestions for short input', async () => {
    inputElement.value = 'te'

    await musicMatchController.triggerUserInput()

    expect(suggestionsElement.children.length).toBe(0)
  })

  test('should handle empty API response', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          results: {
            trackmatches: {
              track: []
            }
          }
        })
      })
    )

    inputElement.value = 'test'

    await expect(musicMatchController.triggerUserInput()).rejects.toThrow(
      'Failed to fetch suggestions: No results found from Last.fm'
    )

    expect(suggestionsElement.children.length).toBe(0)
  })

  test('should handle non-200 API response status gracefully', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      })
    )

    inputElement.value = 'test'

    await expect(musicMatchController.triggerUserInput()).rejects.toThrow(
      'Failed to fetch suggestions: Failed to fetch tracks from Last.fm: Failed to fetch data from Last.fm: API request failed with status: 500'
    )

    expect(suggestionsElement.children.length).toBe(0)
  })
})
