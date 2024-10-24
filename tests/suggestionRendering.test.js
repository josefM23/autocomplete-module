/**
 * Suggestion Rendering Test for the AutocompleteModule.
 * Ensures that suggestions are rendered correctly in the DOM.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

import { AutocompleteModule } from '../src/js/components/controllers/autocomplete.js'

test('should render suggestions correctly', () => {
  // Create mock input and suggestions elements for the test.
  const inputElement = document.createElement('input')
  const suggestionsElement = document.createElement('ul')

  // Initialize the AutocompleteModule with the mock elements.
  const autocomplete = new AutocompleteModule(inputElement, suggestionsElement)

  // Set some test data.
  autocomplete.displaySuggestions(['Apple', 'Banana', 'Orange'])

  // Check that the correct number of suggestions is rendered.
  expect(suggestionsElement.children.length).toBe(3)

  // Verify that the suggestions match the data provided.
  expect(suggestionsElement.children[0].textContent).toBe('Apple')
  expect(suggestionsElement.children[1].textContent).toBe('Banana')
  expect(suggestionsElement.children[2].textContent).toBe('Orange')
})
