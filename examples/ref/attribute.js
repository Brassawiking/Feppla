/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dev } = createFeppla()

let showFancy = false

export default ($example) => $example.innerHTML = dev.syntax.html`
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
