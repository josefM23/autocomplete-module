/**
 * The main script file of the application.
 *
 * @author Josef Matyasek
 * @version 1.0.0
 */

import './components/index.js'

document.addEventListener('DOMContentLoaded', () => {
  const homeView = document.createElement('home-view')

  const autocomplete = document.createElement('autocomplete-module')
  autocomplete.slot = 'autocomplete' // Fix layout.

  homeView.appendChild(autocomplete)
  document.body.appendChild(homeView)

  autocomplete.setData(['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'])
})
