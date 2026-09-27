/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref } = createFeppla()

export default ($example) => $example.innerHTML = `
  <mark ${ref()
    .property('textContent', (el) => { 
      const rect = el.getBoundingClientRect()
      return `x: ${rect.left}, y: ${rect.top}`
    })
  }></mark>
`
