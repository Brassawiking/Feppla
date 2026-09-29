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
      .init(async (el) => {
        const cleanupFeedback = $example.querySelector('#init-async-cleanup-feedback')
        cleanupFeedback.textContent = ''

        await new Promise((resolve) => { 
          setTimeout(resolve, 1000) 
        })
        el.textContent = '✅ Async initialized'

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
