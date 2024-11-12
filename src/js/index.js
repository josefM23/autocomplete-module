/**
 * Initializes the HomeView and MusicMatchController components.
 * This script dynamically loads the HomeView and MusicMatchController into the DOM
 * and sets up the autocomplete functionality with data from the Last.fm API.
 *
 * @version 1.0.0
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 */

import './components/index.js'

document.addEventListener('DOMContentLoaded', initializeApp)

/**
 * Initializes the application by appending the HomeView component
 * and setting up event listeners for the MusicMatchController.
 */
async function initializeApp () {
  const homeView = await loadHomeView()
  const { inputElement, suggestionsElement } = getInputElements(homeView)

  if (inputElement && suggestionsElement) {
    await loadMusicMatchController(inputElement, suggestionsElement)
  }
}

/**
 * Loads and appends the HomeView component to the DOM.
 *
 * @returns {HTMLElement} The loaded HomeView element.
 */
async function loadHomeView () {
  const homeView = document.createElement('home-view')
  document.body.appendChild(homeView)
  await customElements.whenDefined('home-view')
  return homeView
}

/**
 * Retrieves the search input and suggestions elements from the HomeView's shadow DOM.
 *
 * @param {HTMLElement} homeView - The HomeView component.
 * @returns {object} An object containing references to the input and suggestions elements.
 */
function getInputElements (homeView) {
  const inputElement = homeView.shadowRoot.querySelector('#search')
  const suggestionsElement = homeView.shadowRoot.querySelector('#suggestions')
  return { inputElement, suggestionsElement }
}

/**
 * Dynamically loads the MusicMatchController module and sets up the event listener
 * to trigger suggestions on user input.
 *
 * @param {HTMLElement} inputElement - The search input element.
 * @param {HTMLElement} suggestionsElement - The element to display suggestions.
 */
async function loadMusicMatchController (inputElement, suggestionsElement) {
  try {
    const module = await import('./components/controllers/musicMatch.js')

    if (typeof module.createMusicMatchController === 'function') {
      const controller = module.createMusicMatchController(inputElement, suggestionsElement)
      addInputEventListener(inputElement, controller)
    } else {
      console.error('Error: createMusicMatchController is not a function')
    }
  } catch (error) {
    console.error('Failed to load MusicMatchController dynamically:', error)
  }
}

/**
 * Adds an event listener to trigger suggestions after the first character is typed.
 *
 * @param {HTMLElement} inputElement - The search input element.
 * @param {object} controller - The MusicMatchController instance.
 */
function addInputEventListener (inputElement, controller) {
  inputElement.addEventListener('input', () => {
    if (inputElement.value.length > 0) {
      controller.triggerUserInput()
    }
  })
}
