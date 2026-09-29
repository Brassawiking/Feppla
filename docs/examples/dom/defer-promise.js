/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { ref, dom: { when, defer }, dev } = createFeppla()

let showDeferred = true

const fetchMessage = () => new Promise((resolve) => {
  setTimeout(() => resolve('Hello!'), 1000)
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

      ${defer(fetchMessage().then(message => dev.syntax.html`
        <div>${message}</div>
      `)
      , dev.syntax.html`
        <div>Loading...</div>
      `, (error) => dev.syntax.html`
        <div>Something went wrong</div>
      `)}
    </div>
  `)}
`
