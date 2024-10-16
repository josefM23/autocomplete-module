/**
 * Initializes the HomeView and MusicMatchController components.
 * This script dynamically loads the HomeView and MusicMatchController into the DOM
 * and sets up the autocomplete functionality with data from the Last.fm API.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

// Import components index.js to load all necessary components (controllers, views, models)
import './components/index.js'

document.addEventListener('DOMContentLoaded', () => {
  const homeView = document.createElement('home-view')
  document.body.appendChild(homeView)

  setTimeout(async () => {
    const inputElement = homeView.shadowRoot.querySelector('#search')
    const suggestionsElement = homeView.shadowRoot.querySelector('#suggestions')

    if (inputElement && suggestionsElement) {
      try {
        // Dynamiskt importera MusicMatchController och dess fabrikationsfunktion bättre prestanda.
        const module = await import('./components/controllers/musicMatch.js')

        // Använd fabriksfunktionen för att skapa och initiera MusicMatchController
        module.createMusicMatchController(inputElement, suggestionsElement)
      } catch (error) {
        console.error('Failed to load MusicMatchController dynamically:', error)
      }
    }
  }, 0)
})
