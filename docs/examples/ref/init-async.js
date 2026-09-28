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
        await new Promise((resolve) => { 
          setTimeout(resolve, 1000) 
        })
        el.textContent = '✅ Async initialized'

        return () => {
          alert('✅ Cleanup')
        }
      })
    }>
      Waiting for initialized
    </div>
  `)}
`
