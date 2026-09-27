/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref } = createFeppla()

export default ($example) => {
  $example.innerHTML = `
    <div id="ref-explicit-node"></div>
  `

  ref($example.querySelector('#ref-explicit-node'))
    .node((el) => {
      el.textContent = '✅ Explicit node'
    })
}
