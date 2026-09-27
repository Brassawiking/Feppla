/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref } = createFeppla()

export default ($example) => $example.innerHTML = `
  <button ${ref()
    .on('click', () => { alert('✅ Event binding') })
  }>
    Trigger "click"
  </button>
`
