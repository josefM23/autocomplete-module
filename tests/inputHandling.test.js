/**
 * Tests the input handling logic of the AutocompleteModule.
 * This file focuses on how the component handles user input.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

import { AutocompleteModule } from '../src/js/components/modules/autocomplete.js'

/**
 * Tests that suggestions are cleared if input length is less than 3 characters.
 * Ensures that no suggestions are displayed for invalid input.
 */
test('should clear suggestions if input is less than 3 characters', () => {
  const autocomplete = new AutocompleteModule()
  autocomplete.setData(['Apple', 'Banana', 'Orange'])

  // Set up the data for the autocomplete.
  autocomplete.inputElement.value = 'Ap'
  autocomplete.onInput()

  // Expect the suggestions list to be empty.
  expect(autocomplete.suggestionsElement.innerHTML).toBe('') // Inga förslag visas
})

/**
 * Tests that suggestions are displayed when valid input is provided.
 * Ensures that at least one suggestion is shown when the input matches the data.
 */
test('should show suggestions when input is valid', () => {
  const autocomplete = new AutocompleteModule()

  // Set up the data for the autocomplete.
  autocomplete.setData(['Apple', 'Banana', 'Orange'])

  // Input a valid string with 3 characters.
  autocomplete.inputElement.value = 'App'
  autocomplete.onInput()

  // Expect one suggestion to be displayed.
  expect(autocomplete.suggestionsElement.childElementCount).toBe(1)
})
