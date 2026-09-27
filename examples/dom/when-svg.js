/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { when }, dev } = createFeppla()

let showText = false

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => { showText = !showText })
  }>
    Toggle text
  </button>

  <br/>

  <svg width="300" height="200">
    <rect width="100%" height="100%" fill="salmon" />
    <circle cx="150" cy="100" r="80" fill="gold" />
    <g>
      ${when(() => showText, () => `
        <text x="150" y="120" font-size="60" text-anchor="middle" fill="black">
          SVG
        </text>
      `)}
    </g>
  </svg>
`
