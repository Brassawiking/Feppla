/* EXAMPLE */
import { createFeppla, pending } from '../../../src/feppla.js'
const { ref, dom: { text }, dev } = createFeppla()

let message

const fetchMessage = () => {
  message = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello!')
    }, 1000)
  })
}

const clearMessage = () => {
  message = null
}

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', fetchMessage)
  }>
    Fetch message
  </button>

  <button ${ref()
    .on('click', clearMessage)
  }>
    Clear message
  </button>

  <div>
    ${text(() => pending(message, 'Loading message...'))}
  </div>
  <div>
    ${text(() => message)}
  </div>
`
