/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { ref, dom: { when }, dev } = createFeppla()

let showContent = true

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => { showContent = !showContent })
  }>
    Toggle content
  </button>

  ${when(() => showContent, () => dev.syntax.html`
    <div ${ref()
      .init((el) => {
        const cleanupFeedback = $example.querySelector('#init-async-cleanup-feedback')
        cleanupFeedback.textContent = ''
        el.textContent = '✅ Initialized'

        return () => {
          cleanupFeedback.textContent = '✅ Cleanup done'
        }
      })
    }>
      Waiting for initialized
    </div>
  `)}

  <div id="init-async-cleanup-feedback"></div>
`
