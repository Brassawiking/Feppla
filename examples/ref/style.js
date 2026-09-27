/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref } = createFeppla()

let showFancy = false

export default ($example) => $example.innerHTML = `
  <button ${ref()
    .on('click', () => { showFancy = !showFancy })
    .style('background', () => showFancy ? 'lime' : null)
  }>
    Toggle fancy style
  </button>
`
