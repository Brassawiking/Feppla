/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dev } = createFeppla()

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => { alert('✅ Event binding') })
  }>
    Trigger "click"
  </button>
`
