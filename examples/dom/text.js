/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { dom: { text } } = createFeppla()

export default ($example) => $example.innerHTML = `
  Time: ${text(() => new Date().toLocaleTimeString())}
`
