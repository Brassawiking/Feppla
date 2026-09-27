/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { dom: { modify } } = createFeppla()

export default ($example) => $example.innerHTML = `
  ${modify((cursor) => {
    cursor.textContent = '✅ Template modification'
  })}
`
