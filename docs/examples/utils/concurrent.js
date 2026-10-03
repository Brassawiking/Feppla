/* EXAMPLE */
import { createFeppla, concurrent } from '../../../src/feppla.js'
const { ref, dom: { when, defer }, dev } = createFeppla()

let showDeferred = true

const delayedContent = (message) => new Promise((resolve) => {
  setTimeout(() => resolve(`<div>${message}</div>`), 1000)
})

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => { showDeferred = !showDeferred })
  }>
    Toggle deferred
  </button>

  ${when(() => showDeferred, () => dev.syntax.html`
    <div>
      Deferred content:

      ${defer(async () => concurrent`
        ${delayedContent('A')}
        ${delayedContent('B')}
        ${delayedContent('C')}
        ${delayedContent('D')}
        ${delayedContent('E')}
      `, dev.syntax.html`
        <div>Loading...</div>
      `, (error) => dev.syntax.html`
        <div>Something went wrong: ${error}</div>
      `)}
    </div>
  `)}
`
