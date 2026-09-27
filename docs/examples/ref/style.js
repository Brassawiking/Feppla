/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { ref, dev } = createFeppla()

let showFancy = false

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => { showFancy = !showFancy })
    .style('background', () => showFancy ? 'lime' : null)
  }>
    Toggle fancy style
  </button>
`
