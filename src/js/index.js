/**
 * Initializes the HomeView and MusicMatchController components.
 * This script dynamically loads the HomeView and MusicMatchController into the DOM
 * and sets up the autocomplete functionality with data from the Last.fm API.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

import './components/index.js'

document.addEventListener('DOMContentLoaded', async () => {
  const homeView = document.createElement('home-view')
  document.body.appendChild(homeView)

  // Väntar på att custom-elementet 'home-view' ska vara definierat och tillgängligt....
  await customElements.whenDefined('home-view')

  const inputElement = homeView.shadowRoot.querySelector('#search')
  const suggestionsElement = homeView.shadowRoot.querySelector('#suggestions')

  if (inputElement && suggestionsElement) {
    try {
      const module = await import('./components/controllers/musicMatch.js')

      if (typeof module.createMusicMatchController === 'function') {
        module.createMusicMatchController(inputElement, suggestionsElement)
      } else {
        throw new Error('createMusicMatchController is not a function')
      }
    } catch (error) {
      console.error('Failed to load MusicMatchController dynamically:', error)
    }
  }
})
