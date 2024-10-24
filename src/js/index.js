/**
 * Initializes the HomeView and MusicMatchController components.
 * This script dynamically loads the HomeView and MusicMatchController into the DOM
 * and sets up the autocomplete functionality with data from the Last.fm API.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

// Import components index.js to load all necessary components (controllers, views, models).
// I don't use Dependency injecion here - I like this version av imports (by Mats teaching).
import './components/index.js'

document.addEventListener('DOMContentLoaded', () => {
  const homeView = document.createElement('home-view')
  document.body.appendChild(homeView)

  setTimeout(async () => {
    const inputElement = homeView.shadowRoot.querySelector('#search')
    const suggestionsElement = homeView.shadowRoot.querySelector('#suggestions')

    if (inputElement && suggestionsElement) {
      try {
        // Dynamisk import av MusicMatchController
        const module = await import('./components/controllers/musicMatch.js')

        // Kolla om `createMusicMatchController` faktiskt finns i modulen.
        if (typeof module.createMusicMatchController === 'function') {
          // Använd fabriksfunktionen för att skapa och initiera MusicMatchController
          module.createMusicMatchController(inputElement, suggestionsElement)
        } else {
          throw new Error('createMusicMatchController is not a function')
        }
      } catch (error) {
        console.error('Failed to load MusicMatchController dynamically:', error)
      }
    }
  }, 0)
})
console.log('Env variables:', import.meta.env)
