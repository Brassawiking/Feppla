/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { ref, dev } = createFeppla()

export default ($example) => $example.innerHTML = dev.syntax.html`
  <div ${ref()
    .node((el) => {
      el.textContent = '✅ Implicit node'
    })
  }></div>
`
