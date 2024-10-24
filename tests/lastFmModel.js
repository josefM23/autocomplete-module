/**
 * Tests for the MusicMatchController.
 * This test file focuses on how the controller interacts with the Last.fm API model and the AutocompleteModule.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

// Instead of `import`, use CommonJS `require`
const { MusicMatchController } = require('../src/js/components/controllers/musicMatch.js')
const { LastfmModel } = require('../src/js/components/models/lastFmModel.js')

// Mock LastfmModel for tests
jest.mock('../src/js/components/models/lastFmModel.js')

describe('MusicMatchController', () => {
  let inputElement
  let suggestionsElement
  let musicMatchController

  beforeEach(() => {
    inputElement = document.createElement('input')
    suggestionsElement = document.createElement('ul')

    LastfmModel.mockImplementation(() => ({
      searchTracks: jest.fn().mockResolvedValue([
        { artist: 'Artist 1', name: 'Track 1' },
        { artist: 'Artist 2', name: 'Track 2' }
      ])
    }))

    musicMatchController = new MusicMatchController(inputElement, suggestionsElement, new LastfmModel())
  })

  test('should fetch and display suggestions on valid input', async () => {
    inputElement.value = 'test'

    // Trigger input
    await musicMatchController.onUserInput()

    // Check that suggestions have rendered correctly
    expect(suggestionsElement.children.length).toBe(2)
    expect(suggestionsElement.children[0].textContent).toBe('Artist: Artist 1 - Song: Track 1')
    expect(suggestionsElement.children[1].textContent).toBe('Artist: Artist 2 - Song: Track 2')
  })
})
