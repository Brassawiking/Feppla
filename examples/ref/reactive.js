/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { text } } = createFeppla()

let counter = 0

export default ($example) => $example.innerHTML = `
  <button ${ref()
    .on('click', () => { counter++ })
  }>
    Click me
  </button>

  Clicked ${text(() => counter)} times
`
