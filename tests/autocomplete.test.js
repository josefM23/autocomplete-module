/**
 * Tests for the AutocompleteModule.
 * This test file focuses on the general functionality of the autocomplete component.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

import { AutocompleteModule } from '../src/js/components/modules/autocomplete.js'

/**
 * Tests the setData method of the AutocompleteModule.
 * Ensures that duplicate entries are filtered and only unique data is stored.
 */
test('should set unique data in autocomplete', () => {
  // Create mock HTML elements for input and suggestions.
  const inputElement = document.createElement('input')
  const suggestionsElement = document.createElement('ul')

  // Create an instance of AutocompleteModule with the mock elements.
  const autocomplete = new AutocompleteModule(inputElement, suggestionsElement)

  // Provide duplicate data.
  autocomplete.setData(['Apple', 'Banana', 'Apple'])

  // Expect only 2 unique items in the data.
  expect(autocomplete.data.length).toBe(2)

  // Expect the data to be in lowercase and sorted.
  expect(autocomplete.data).toEqual(['apple', 'banana'])
})

/**
 * Tests the onUserInput method of the AutocompleteModule.
 * Ensures that the search is triggered when the input value has at least 3 characters.
 */
test('should trigger search when input has 3 or more characters', () => {
  // Create mock HTML elements for input and suggestions.
  const inputElement = document.createElement('input')
  const suggestionsElement = document.createElement('ul')

  // Create an instance of AutocompleteModule with the mock elements.
  const autocomplete = new AutocompleteModule(inputElement, suggestionsElement)

  // Set some test data.
  autocomplete.setData(['Apple', 'Banana', 'Orange'])

  // Simulate user input with 3 characters.
  inputElement.value = 'App'
  autocomplete.onUserInput()

  // Check that suggestions were generated.
  expect(suggestionsElement.children.length).toBeGreaterThan(0)
})

/**
 * Tests the clearSuggestions method of the AutocompleteModule.
 * Ensures that suggestions are cleared when the input is invalid.
 */
test('should clear suggestions when input is invalid', () => {
  // Create mock HTML elements for input and suggestions.
  const inputElement = document.createElement('input')
  const suggestionsElement = document.createElement('ul')

  // Create an instance of AutocompleteModule with the mock elements.
  const autocomplete = new AutocompleteModule(inputElement, suggestionsElement)

  // Set some test data.
  autocomplete.setData(['Apple', 'Banana', 'Orange'])

  // Simulate user input with less than 3 characters.
  inputElement.value = 'Ap'
  autocomplete.onUserInput()

  // Check that suggestions were cleared.
  expect(suggestionsElement.children.length).toBe(0)
})
