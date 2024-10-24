import { MusicMatchController } from '../src/js/components/controllers/musicMatch.js'
import { LastfmModel } from '../src/js/components/models/lastFmModel.js'
import { jest } from '@jest/globals'  // Importera jest explicit i ES-modulmiljö

describe('MusicMatchController', () => {
  let inputElement
  let suggestionsElement
  let musicMatchController

  // Mock global fetch direkt i testfilen
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          results: {
            trackmatches: {
              track: [
                { artist: 'Artist 1', name: 'Track 1' },
                { artist: 'Artist 2', name: 'Track 2' }
              ]
            }
          }
        })
      })
    )

    // Mocka miljövariabeln för API-nyckeln
    process.env.VITE_LASTFM_API_KEY = 'mocked-api-key'
  })

  afterAll(() => {
    global.fetch.mockClear()
    delete global.fetch
  })

  beforeEach(() => {
    inputElement = document.createElement('input')
    suggestionsElement = document.createElement('ul')

    // Skapa MusicMatchController-instansen med mockad LastfmModel
    const lastfmModel = new LastfmModel(process.env.VITE_LASTFM_API_KEY)
    musicMatchController = new MusicMatchController(inputElement, suggestionsElement, lastfmModel)
  })

  test('should fetch and display suggestions on valid input', async () => {
    inputElement.value = 'test'

    // Simulera användarinmatning och trigga autocomplete
    await musicMatchController.handleUserInput()

    // Kontrollera att förslag renderades korrekt
    expect(suggestionsElement.children.length).toBe(2)
    expect(suggestionsElement.children[0].textContent).toBe('Artist: Artist 1 - Song: Track 1')
    expect(suggestionsElement.children[1].textContent).toBe('Artist: Artist 2 - Song: Track 2')
  })
})
