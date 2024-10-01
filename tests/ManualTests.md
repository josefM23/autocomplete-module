# Manual Test Scenarios for Autocomplete Component

## Test 0: Load the homepage and verify that all required elements are rendered

**Steps:**
1. Open the application.
2. Observe the page layout and UI elements.

**Expected Result:**
- The homepage should load without any errors.
- The following elements should be present:
  - A header with the title "Welcome to the Home Page".
  - An input field for searching with the placeholder text "Start typing...".
  - An empty list element for suggestions.

**Actual Result:**
- The header "Welcome to the Home Page" was displayed correctly, above the input field as expected.
- The layout was improved using a `<slot>` in the `home-view` to correctly place the `autocomplete` component below the header.
- The elements are not centered vertically, but the header is correctly placed above the search field.
- A `404` error for the favicon was previously detected, but this was fixed.
- The message "Enjoy the app" was displayed (don't want it).

**Changes Made:**
- Added a `<slot>` in the `home-view` component to manage the placement of the autocomplete component relative to the header.
- Ensured the `autocomplete` component is placed below the header, fixing the layout issue.
- Fixed the favicon issue by adding a base64 data URL for a transparent placeholder favicon, avoiding the 404 error.
- The message "Enjoy the app" was deleted.

**Status:** Pass (layout, favicon issues resolved message deleted)

---

## Test 1: Display suggestions when typing

**Steps:**
1. Open the application.
2. Click on the input field.
3. Enter the text "App".

**Expected Result:**
Suggestions matching the input "App" (e.g., "Apple", "Pineapple") should be displayed.

**Actual Result:** 
Suggestions "Apple" and 
"Pineapple" were displayed.

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
3. Enter the text "App".
4. Click on the suggestion "Apple".

**Expected Result:**
The text "Apple" should be inserted into the input field, and suggestions should disappear.

**Actual Result:** 
The text "Apple" was inserted, and suggestions disappeared.

**Status:** Pass

---

## Test 4: Display "No matches found" message

**Steps:**
1. Open the application.
2. Click on the input field.
3. Enter the text "XYZ".

**Expected Result:**
The message "No matches found" should be displayed.

**Actual Result:** 
The message "No matches found" was displayed.

**Status:** Pass

---