/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { dom: { text }, dev } = createFeppla()

export default ($example) => $example.innerHTML = dev.syntax.html`
  Time: ${text(() => new Date().toLocaleTimeString())}
`
