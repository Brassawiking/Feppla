/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { when }, dev } = createFeppla()

let showDetails = false

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => { showDetails = !showDetails })
  }>
    Toggle details
  </button>

  ${when(() => showDetails, () => `
    <p>Showing more details</p>	
  `)}
`
