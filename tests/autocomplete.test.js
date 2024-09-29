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
  const autocomplete = new AutocompleteModule()

  // Provide duplicate data.
  autocomplete.setData(['Apple', 'Banana', 'Apple'])

  // Expect only 2 unique items in the data.
  expect(autocomplete.data.length).toBe(2)

  // Expect the data to be in lowercase and sorted.
  expect(autocomplete.data).toEqual(['apple', 'banana'])
})
