/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref } = createFeppla()

export default ($example) => {
  $example.innerHTML = `
    <div id="ref-selector-node"></div>
  `

  ref('#ref-selector-node')
    .node((el) => {
      el.textContent = '✅ Selector node'
    })
}
