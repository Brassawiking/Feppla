/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref } = createFeppla()

export default ($example) => $example.innerHTML = `
  <div ${ref()
    .node(function() {
      this.message = '✅ Daisy chain state'
    })
    .node(function(el) {
      el.textContent = this.message
    })
  }></div>
`
