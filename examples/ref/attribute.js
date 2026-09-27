/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref } = createFeppla()

let showFancy = false

export default ($example) => $example.innerHTML = `
  <style>
    [fancy-button] {
      background: lime;
    }
  </style>

  <button ${ref()
    .on('click', () => { showFancy = !showFancy })
    .attribute('fancy-button', () => showFancy ? '' : null)
  }>
    Toggle fancy attribute
  </button>
`
