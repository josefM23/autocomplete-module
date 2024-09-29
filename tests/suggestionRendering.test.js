/**
 * Tests for suggestion rendering in the AutocompleteModule.
 * This file focuses on how the suggestions are rendered and displayed in the DOM.
 *
 * @author Josef Matyasek <jm224ae@student.lnu.se>
 * @version 1.0.0
 */

import { AutocompleteModule } from '../src/js/components/modules/autocomplete.js'

/**
 * Tests that valid suggestions are rendered correctly in the DOM.
 * Ensures that the correct number of suggestions are shown based on input.
 */
test('should render suggestions in the DOM', () => {
  const autocomplete = new AutocompleteModule()
  autocomplete.setData(['Apple', 'Banana'])

  // Perform a search with a valid query.
  autocomplete.search('App')
  // Get the rendered suggestion items.
  const suggestionItems = autocomplete.suggestionsElement.querySelectorAll('li')

  // Expect one suggestion to be rendered in the list.
  expect(suggestionItems.length).toBe(1)

  // Expect the content of the suggestion to be "apple".
  expect(suggestionItems[0].textContent).toBe('apple')
})

/**
 * Tests that "No matches found" message is shown when there are no suggestions.
 * Ensures that appropriate feedback is given to the user when no data matches the input.
 */
test('should show "No matches found" when there are no suggestions', () => {
  const autocomplete = new AutocompleteModule()
  autocomplete.setData(['Apple', 'Banana'])

  // Perform a search with a query that doesn't match any data.
  autocomplete.search('Orange')

  // Get the rendered suggestion items.
  const suggestionItems = autocomplete.suggestionsElement.querySelectorAll('li')

  // Expect the list to contain only the "No matches found" message.
  expect(suggestionItems.length).toBe(1)
  expect(suggestionItems[0].textContent).toBe('No matches found')
})
