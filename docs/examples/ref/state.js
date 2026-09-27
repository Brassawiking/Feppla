/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { ref, dev } = createFeppla()

export default ($example) => $example.innerHTML = dev.syntax.html`
  <div ${ref()
    .node(function() {
      this.message = '✅ Daisy chain state'
    })
    .node(function(el) {
      el.textContent = this.message
    })
  }></div>
`
