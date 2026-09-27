/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { ref, dev } = createFeppla()

export default ($example) => {
  $example.innerHTML = dev.syntax.html`
    <div id="ref-explicit-node"></div>
  `

  ref($example.querySelector('#ref-explicit-node'))
    .node((el) => {
      el.textContent = '✅ Explicit node'
    })
}
