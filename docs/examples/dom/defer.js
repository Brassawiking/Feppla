/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { ref, dom: { when, defer }, dev } = createFeppla()

let showDeferred = true

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => { showDeferred = !showDeferred })
  }>
    Toggle deferred
  </button>

  ${when(() => showDeferred, () => dev.syntax.html`
    <div>
      Deferred content:

      ${defer(async () => dev.syntax.html`
        <div>
          Hi!
        </div>
        <div>
          ${await new Promise((resolve, reject) => {
            setTimeout(() => resolve('Hello!'), 1000)
          })}
        </div>
      `, dev.syntax.html`
        <div>Loading...</div>
      `, (error) => dev.syntax.html`
        <div>Something went wrong: ${error}</div>
      `)}
    </div>
  `)}
`
