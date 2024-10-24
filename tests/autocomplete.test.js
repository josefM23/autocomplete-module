/**
 * Tests for the AutocompleteModule.
 * This test file focuses on the general functionality of the autocomplete component.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

import { AutocompleteModule } from '../src/js/components/controllers/autocomplete.js'

/**
 * Test the `updateSuggestionsList` method to ensure that duplicate entries are filtered and
 * only unique, sorted, and lowercase data is stored in the AutocompleteModule.
 */
test('should set unique, lowercase, sorted data in autocomplete', () => {
  // Create mock HTML elements for input and suggestions.
  const inputElement = document.createElement('input')
  const suggestionsElement = document.createElement('ul')

  // Create an instance of AutocompleteModule with the mock elements.
  const autocomplete = new AutocompleteModule(inputElement, suggestionsElement)

  // Provide duplicate data.
  autocomplete.updateSuggestionsList(['Apple', 'Banana', 'apple'])

  // Expect only 2 unique items in the data, sorted and lowercase.
  expect(autocomplete.data.length).toBe(2)
  expect(autocomplete.data).toEqual(['apple', 'banana'])
})

/**
 * Test the `onUserInput` method to ensure that the search is triggered
 * when the input value has 3 or more characters.
 */
test('should trigger search when input has 3 or more characters', () => {
  // Create mock HTML elements for input and suggestions.
  const inputElement = document.createElement('input')
  const suggestionsElement = document.createElement('ul')

  // Create an instance of AutocompleteModule with the mock elements.
  const autocomplete = new AutocompleteModule(inputElement, suggestionsElement)

  // Set some test data for the autocomplete.
  autocomplete.updateSuggestionsList(['Apple', 'Banana', 'Orange'])

  // Simulate user input with 3 characters.
  inputElement.value = 'App'
  autocomplete.onUserInput()

  // Check that suggestions were generated.
  expect(suggestionsElement.children.length).toBeGreaterThan(0)
})

/**
 * Test the `clearSuggestions` method to ensure that suggestions
 * are cleared when the input is invalid (less than 3 characters).
 */
test('should clear suggestions when input is invalid', () => {
  // Create mock HTML elements for input and suggestions.
  const inputElement = document.createElement('input')
  const suggestionsElement = document.createElement('ul')

  // Create an instance of AutocompleteModule with the mock elements.
  const autocomplete = new AutocompleteModule(inputElement, suggestionsElement)

  // Set some test data.
  autocomplete.updateSuggestionsList(['Apple', 'Banana', 'Orange'])

  // Simulate user input with less than 3 characters.
  inputElement.value = 'Ap'
  autocomplete.onUserInput()

  // Check that suggestions were cleared.
  expect(suggestionsElement.children.length).toBe(0)
})
