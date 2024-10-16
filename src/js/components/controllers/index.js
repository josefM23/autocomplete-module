/**
 * Index file for the modules.
 * Imports the AutocompleteModule.
 *
 * @author Josef Matyasek
 * @version 1.0.0
 */

import './autocomplete.js'
import { MusicMatchController } from './musicMatch.js'

// Kontrollera att MusicMatchController exporteras
console.log('MusicMatchController from controllers/index.js:', MusicMatchController)

// Exportera MusicMatchController så att det kan användas globalt via imports
export { MusicMatchController }
