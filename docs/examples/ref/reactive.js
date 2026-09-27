/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { ref, dom: { text }, dev } = createFeppla()

// Default reactivity model is to check all getters in a global animation frame loop.

let counter = 0

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => { counter++ })
  }>
    Click me
  </button>

  Clicked ${text(() => counter)} times
`
