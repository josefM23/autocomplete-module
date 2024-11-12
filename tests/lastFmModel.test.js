/**
 * Tests for the MusicMatchController with LastfmModel integration.
 * This test file ensures that the controller correctly interacts with the mocked LastfmModel
 * and displays the expected suggestions in the UI.
 *
 * @version 1.0.0
 * @module MusicMatchControllerTest
 */

import { MusicMatchController } from '../src/js/components/controllers/musicMatch.js'
import { LastfmModel } from '../src/js/components/models/lastFmModel.js'
import { jest } from '@jest/globals'

describe('MusicMatchController', () => {
  let inputElement
  let suggestionsElement
  let musicMatchController

  beforeAll(() => {
    // Mocks the API key for Last.fm.
    process.env.VITE_LASTFM_API_KEY = 'mocked-api-key'

    // Mock the fetch function to return a preset response for testing.
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
    // Clears and removes the fetch mock after all tests.
    global.fetch.mockClear()
    delete global.fetch
  })

  beforeEach(() => {
    // Sets up mock HTML elements for input and suggestions.
    inputElement = document.createElement('input')
    suggestionsElement = document.createElement('ul')

    // Creates a new instance of LastfmModel with the mocked API key.
    const lastfmModel = new LastfmModel(process.env.VITE_LASTFM_API_KEY)

    // Initializes MusicMatchController with mocked elements and model.
    musicMatchController = new MusicMatchController(inputElement, suggestionsElement, lastfmModel)
  })

  /**
   * Test to ensure that MusicMatchController fetches and displays suggestions correctly
   * when valid input is provided in the input field.
   */
  test('should fetch and display suggestions on valid input', async () => {
    // Sets input value to a valid test string.
    inputElement.value = 'test'

    // Triggers the user input function.
    await musicMatchController.triggerUserInput()

    // Waits for DOM updates to complete.
    await new Promise(resolve => setTimeout(resolve, 50))

    // Validates that two suggestions were rendered in the DOM.
    expect(suggestionsElement.children.length).toBe(2)

    // Validates the content of each suggestion, converted to lowercase for comparison.
    expect(suggestionsElement.children[0].textContent.toLowerCase()).toBe('artist: test artist 1 - song: track 1')
    expect(suggestionsElement.children[1].textContent.toLowerCase()).toBe('artist: test artist 2 - song: track 2')
  })
})
