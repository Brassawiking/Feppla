/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref } = createFeppla()

let showFancy = false

export default ($example) => $example.innerHTML = `
  <style>
    .fancy-button {
      background: lime;
    }
  </style>

  <button ${ref()
    .on('click', () => { showFancy = !showFancy })
    .class('fancy-button', () => showFancy)
  }>
    Toggle fancy class
  </button>
`
