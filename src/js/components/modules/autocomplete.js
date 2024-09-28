/**
 * The module that handles the logic for the autocomplete component.
 * Provides methods for setting data, searching, and displaying suggestions.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

// Create the template for the autocomplete component.
const template = document.createElement('template')
template.innerHTML = `
  <div class="autocomplete">
    <input type="text" id="search" placeholder="Start typing..." />
    <ul id="suggestions"></ul>
  </div>
`
// Just starting point.
