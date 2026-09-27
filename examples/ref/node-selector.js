/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dev } = createFeppla()

export default ($example) => {
  $example.innerHTML = dev.syntax.html`
    <div id="ref-selector-node"></div>
  `

  ref('#ref-selector-node')
    .node((el) => {
      el.textContent = '✅ Selector node'
    })
}
