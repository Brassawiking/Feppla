/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { dom: { modify }, dev } = createFeppla()

export default ($example) => $example.innerHTML = dev.syntax.html`
  ${modify((cursor) => {
    cursor.textContent = '✅ Template modification'
  })}
`
