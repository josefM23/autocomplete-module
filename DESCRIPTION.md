# Autocomplete Module

The **AutocompleteModule** is a reusable JavaScript web component designed to provide search suggestions in real time based on user input. It supports data-driven suggestions, real-time filtering, and basic validation.

## Features
- **Real-time Search Suggestions**: As users type in the input field, matching suggestions are displayed.
- **Customizable Data Input**: You can pass in your own data array to generate the autocomplete suggestions.
- **Case-Insensitive Matching**: The module performs case-insensitive searches to match suggestions.
- **SearchView Integration**: The module works in conjunction with a `SearchView` component for rendering the search input and results.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [SearchView](#searchview)
- [Tests](#tests)
- [License](#license)

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/josefM23/autocomplete-module.git
    ```

2. Navigate to the project directory:

    ```bash
    cd autocomplete-module
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000` to view the module in action.

## Usage

Once installed, you can use the **AutocompleteModule** component in your web projects by importing it into your code.

Here’s a basic example of how to initialize and use the module:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Autocomplete Example</title>
    <script type="module" src="./src/js/index.js"></script>
  </head>
  <body>
    <home-view>
      <autocomplete-module slot="autocomplete"></autocomplete-module>
    </home-view>
  </body>
</html>

In your index.js file:

javascript

import './components/index.js';

document.addEventListener('DOMContentLoaded', () => {
  const homeView = document.createElement('home-view');
  
  const autocomplete = document.createElement('autocomplete-module');
  autocomplete.setData(['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple']);
  
  document.body.appendChild(homeView);
  homeView.appendChild(autocomplete);
});

API
setData(newData)

Sets the data array to be used for autocomplete suggestions. It ensures that the data passed in is unique and case-insensitive.

Parameters:

    newData (Array): The array of strings to be used for suggestions.

Example:

javascript

autocomplete.setData(['Apple', 'Banana', 'Orange']);

SearchView

The SearchView component is used to handle the rendering of the search interface, which includes the input field and the container for autocomplete suggestions. It acts as a wrapper for the AutocompleteModule, providing a structured environment for it to operate within the application.
Example:

html

<search-view>
  <autocomplete-module slot="autocomplete"></autocomplete-module>
</search-view>

The SearchView is responsible for initializing and organizing the search layout, allowing for easy integration of the autocomplete functionality within any view.
Tests

This module includes a suite of automated tests written in Jest. To run the tests, use the following command:

bash

npm run test

The tests include validation for:

    Initialization of the module.
    Functionality of search and suggestion filtering.
    Handling of input data and UI updates.

License

This project is licensed under the MIT License. See the LICENSE file for more information.