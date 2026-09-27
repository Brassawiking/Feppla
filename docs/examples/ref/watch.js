/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { ref, dev } = createFeppla()

export default ($example) => $example.innerHTML = dev.syntax.html`
  <mark ${ref()
    .watch(
      (el) => { 
        const rect = el.getBoundingClientRect()
        return `x: ${Math.round(rect.left)}, y: ${Math.round(rect.top)}`
      },
      (el, value) => {
        el.textContent = value
      }
    )
  }></mark>
`
