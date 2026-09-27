/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { when }, dev } = createFeppla()

let showContent = false

export default ($example) => $example.innerHTML = dev.syntax.html`
  <div ${ref()
    .shadow(dev.syntax.html`
      Shadow content:
      <button ${ref()
        .on('click', () => { showContent = !showContent })
      }>
        Toggle slotted content
      </button>

      ${when(() => showContent, () => dev.syntax.html`
        <p>
          <slot></slot>
        </p>
      `)}
    `)
  }>
    More details
  </div>
`
