/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { text }, dev } = createFeppla()

// Default reactive implemtentation is running all getters on every frame

let counter = 0

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => { counter++ })
  }>
    Click me
  </button>

  Clicked ${text(() => counter)} times
`
