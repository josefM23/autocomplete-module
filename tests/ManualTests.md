# Manual Test Scenarios for Autocomplete Component

## Test 0: Load the homepage and verify that all required elements are rendered

**Steps:**
1. Open the application.
2. Observe the page layout and UI elements.

**Expected Result:**
- The homepage should load without any errors.
- The following elements should be present:
  - A header with the title "Welcome to the Music Match application".
  - An input field for searching with the placeholder text "Start typing...".
  - An empty list element for suggestions.

**Actual Result:**
- The header "Welcome to the Music Match application" was displayed correctly, above the input field as expected. (little bit to slow)

**Status:** Pass 

---

## Test 1: Display suggestions when typing

**Steps:**
1. Open the application.
2. Click on the input field.
3. Enter the text "Ali".

**Expected Result:**
Suggestions matching the input "Ali" (e.g., "alive", "alice") should be displayed ass artist: or song: 

**Actual Result:** 
Suggestions "artist: 100 gecs - song: dumbest girl alive" and meny oithers was displyed.

**Status:** Pass

---

## Test 2: Suggestions are cleared when less than 3 characters are entered

**Steps:**
1. Open the application.
2. Click on the input field.
3. Enter the text "Ap" (only 2 characters).

**Expected Result:**
No suggestions should be displayed.

**Actual Result:** 
No suggestions were displayed.

**Status:** Pass

---

## Test 3: Selecting a suggestion by clicking

**Steps:**
1. Open the application.
2. Click on the input field.
3. Enter the text "Ali".
4. Click on the suggestion: "artist: 100 gecs - song: dumbest girl alive"

**Expected Result:**
The text "artist: 100 gecs - song: dumbest girl alive" should be inserted into the input field, and suggestions should disappear.

**Actual Result:** 
The text "artist: 100 gecs - song: dumbest girl alive" was inserted, and suggestions disappeared.

**Status:** Pass

---

## Test 4: Display "No matches found" message

**Steps:**
1. Open the application.
2. Click on the input field.
3. Enter the text "asfajpe". (it was har to find no sugestion text.)

**Expected Result:**
The message "No matches found" should be displayed.

**Actual Result:** 
The message "No matches found" was displayed.

**Status:** Pass

---