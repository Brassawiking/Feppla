/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { when } } = createFeppla()

let showDetails = false

export default ($example) => $example.innerHTML = `
  <button ${ref()
    .on('click', () => { showDetails = !showDetails })
  }>
    Toggle details
  </button>

  ${when(() => showDetails, () => `
    <p>Showing more details</p>	
  `)}
`
