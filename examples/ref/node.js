/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref } = createFeppla()

export default ($example) => $example.innerHTML = `
  <div ${ref()
    .node((el) => {
      el.textContent = '✅ Implicit node'
    })
  }></div>
`
