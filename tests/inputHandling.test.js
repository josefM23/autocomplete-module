/**
 * Input Handling Test for the AutocompleteModule.
 * Ensures that no suggestions are shown if input is less than 3 characters or invalid.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

import { AutocompleteModule } from '../src/js/components/modules/autocomplete.js'

test('should not search for input less than 3 characters or invalid input', () => {
  // Create mock input and suggestions elements for the test.
  const inputElement = document.createElement('input')
  const suggestionsElement = document.createElement('ul')

  // Initialize the AutocompleteModule with the mock elements.
  const autocomplete = new AutocompleteModule(inputElement, suggestionsElement)

  // Set the data for autocomplete suggestions.
  autocomplete.setData(['Apple', 'Banana', 'Orange'])

  // Test with input less than 3 characters.
  inputElement.value = 'Ap'
  autocomplete.handleInput()

  // Verify that no suggestions are shown for short input.
  expect(suggestionsElement.children.length).toBe(0)

  // Test with invalid input (symbols).
  inputElement.value = '@#%'
  autocomplete.handleInput()

  // Verify that no suggestions are shown for invalid input.
  expect(suggestionsElement.children.length).toBe(0)
})
