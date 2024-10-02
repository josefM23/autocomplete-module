/**
 * Clear Suggestions Test for the AutocompleteModule.
 * Ensures that the suggestions are cleared from the DOM.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

import { AutocompleteModule } from '../src/js/components/modules/autocomplete.js'

test('should clear suggestions from the DOM', () => {
  const inputElement = document.createElement('input')
  const suggestionsElement = document.createElement('ul')

  const autocomplete = new AutocompleteModule(inputElement, suggestionsElement)

  // Populate the suggestions list with mock data.
  autocomplete.displaySuggestions(['Apple', 'Banana', 'Orange']) // Updated function name

  // Clear the suggestions list.
  autocomplete.clearSuggestions()
  expect(suggestionsElement.children.length).toBe(0) // Now this should pass
})
