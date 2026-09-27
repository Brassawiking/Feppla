/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { html } } = createFeppla()

let htmlValue = 'Hello <b>world!</b>'

export default ($example) => $example.innerHTML = `
  <textarea 
    style="width: 100%; 
    height: 100px;" 
    placeholder="Write some HTML..." 
    ${ref()
      .property('value', () => htmlValue)
      .on('input', (event) => { htmlValue = event.target.value })
    }
  ></textarea>

  <hr/>

  ${html(() => htmlValue)}
`
