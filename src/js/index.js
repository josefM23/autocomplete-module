/**
 * The main script file of the application.
 *
 * @author Josef Matyasek
 * @version 1.0.0
 */

// Import components from components/index.js (importerar indirekt moduler och views)
import './components/index.js'

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Add the HomeView component to the DOM
  const homeView = document.createElement('home-view')
  document.body.appendChild(homeView)

  // Add the Autocomplete component to the DOM
  const autocomplete = document.createElement('autocomplete-module')
  document.body.appendChild(autocomplete)

  // Set data for autocomplete
  autocomplete.setData(['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'])
})
