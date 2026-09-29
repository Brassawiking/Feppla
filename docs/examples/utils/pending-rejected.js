/* EXAMPLE */
import { createFeppla, pending } from '../../../src/feppla.js'
const { dom: { text }, dev } = createFeppla()

let message = Promise.reject(new Error('Could not load message'))

export default ($example) => $example.innerHTML = dev.syntax.html`
  <div>
    ${text(() => pending(message, 'Loading message...', (error) => `❌ ${error}`))}
  </div>
`
