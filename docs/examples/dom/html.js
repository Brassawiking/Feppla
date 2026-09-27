/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { ref, dom: { html }, dev } = createFeppla()

let htmlValue = 'Hello <b>world!</b>'

export default ($example) => $example.innerHTML = dev.syntax.html`
  <textarea style="width: 100%; height: 100px;" ${ref()
    .property('value', () => htmlValue)
    .on('input', (event) => { htmlValue = event.target.value })
  }
  ></textarea>

  <hr/>

  ${html(() => htmlValue)}
`
