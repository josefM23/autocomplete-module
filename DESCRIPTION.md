
# MusicMatchController

The **MusicMatchController** is a JavaScript component designed to provide music-based search suggestions in real time using data fetched from the Last.fm API. This module is part of a web application that allows users to search for music-related content, such as artists and tracks, and receive relevant suggestions.

## Features

- **Real-Time Music Suggestions**: Fetches and displays matching suggestions based on Last.fm’s track data as users type in the search field.
- **API-Driven Data Input**: Retrieves data directly from the Last.fm API, ensuring accurate and up-to-date results.
- **Case-Insensitive Matching**: Processes search queries in a case-insensitive manner to enhance usability.
- **HomeView Integration**: Works seamlessly with the `HomeView` component to manage the input and suggestion display interface.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [HomeView](#homeview)
- [Tests](#tests)
- [Live Demo](#live-demo)
- [GitHub Repository](#github-repository)
- [License](#license)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/josefM23/autocomplete-module/tree/musicmatch
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

Once installed, you can use the **MusicMatchController** by importing it into your codebase.

### Example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Music Match Example</title>
  <script type="module" src="./src/js/index.js"></script>
</head>
<body>
  <home-view>
    <music-match-controller slot="musicMatch"></music-match-controller>
  </home-view>
</body>
</html>
```

In your `index.js` file:

```javascript
import './components/index.js'

document.addEventListener('DOMContentLoaded', async () => {
  const homeView = document.createElement('home-view')
  document.body.appendChild(homeView)

  const inputElement = homeView.shadowRoot.querySelector('#search')
  const suggestionsElement = homeView.shadowRoot.querySelector('#suggestions')

  const { createMusicMatchController } = await import('./components/controllers/musicMatch.js')
  const controller = createMusicMatchController(inputElement, suggestionsElement)
})
```

## API

### `setData(newData)`

Sets the data array used for autocomplete suggestions, ensuring data is unique and lowercase for consistency.

#### Parameters:

- `newData` (Array): An array of music track strings to be used for suggestions.

#### Example:

```javascript
controller.setData(['Artist: Test Artist 1 - Song: Track 1', 'Artist: Test Artist 2 - Song: Track 2'])
```

## HomeView

The **HomeView** component is a wrapper for the `MusicMatchController`, providing a structured environment for the input field and suggestions display.

### Example:

```html
<home-view>
  <music-match-controller slot="musicMatch"></music-match-controller>
</home-view>
```

The `HomeView` is responsible for managing the layout and integrating the search functionality within the application.

## Tests

This module includes a suite of automated tests written in Jest. To run the tests, use the following command:

```bash
npm run test
```

### Test Coverage Includes:

- Initialization and setup of `MusicMatchController`.
- Fetching and rendering of suggestions based on user input.
- API interaction and handling of Last.fm data.

## Live Demo

The project is deployed and accessible online:

**[Live Demo](https://jm224aemusicmatch.netlify.app/)**

## GitHub Repository

The source code for the project is available on GitHub:

**[GitHub Repository](https://github.com/josefM23/autocomplete-module/tree/musicmatch)**

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
