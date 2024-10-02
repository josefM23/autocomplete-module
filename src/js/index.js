/**
 * Initializes the HomeView and AutocompleteModule components.
 * This script dynamically loads the HomeView and AutocompleteModule into the DOM and sets up the autocomplete functionality.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

import './components/index.js'

// Import AutocompleteModule explicitly.
import { AutocompleteModule } from './components/modules/autocomplete.js'

document.addEventListener('DOMContentLoaded', () => {
  const homeView = document.createElement('home-view')
  document.body.appendChild(homeView)

  // Wait until homeView is connected and shadowRoot is available.
  setTimeout(() => {
    const inputElement = homeView.shadowRoot.querySelector('#search')
    const suggestionsElement = homeView.shadowRoot.querySelector('#suggestions')

    // Ensure that the input and suggestions elements are present before creating AutocompleteModule.
    if (inputElement && suggestionsElement) {
      // Create AutocompleteModule and set up the suggestions data.
      const autocomplete = new AutocompleteModule(inputElement, suggestionsElement)
      autocomplete.setData(['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'])
    }
  }, 0) // Wait one cycle to ensure the shadow DOM is ready.
})
