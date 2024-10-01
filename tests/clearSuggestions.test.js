/**
 * Clear Suggestions Test for the AutocompleteModule.
 * Ensures that the suggestions are cleared from the DOM.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

import { AutocompleteModule } from '../src/js/components/modules/autocomplete.js'

test('should clear suggestions from the DOM', () => {
  // Create mock input and suggestions elements for the test.
  const inputElement = document.createElement('input')
  const suggestionsElement = document.createElement('ul')

  // Initialize the AutocompleteModule with the mock elements.
  const autocomplete = new AutocompleteModule(inputElement, suggestionsElement)

  // Populate the suggestions list with mock data.
  autocomplete.showSuggestions(['Apple', 'Banana', 'Orange'])

  // Clear the suggestions list.
  autocomplete.clearSuggestions()

  // Verify that the suggestions list is empty.
  expect(suggestionsElement.children.length).toBe(0)
})
