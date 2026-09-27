/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { repeat, text }, dev } = createFeppla()

const counters = [0, 42, -5]

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => { counters.push(0) })
  }>
    Add counter
  </button>

  <button ${ref()
    .on('click', () => { counters.pop() })
  }>
    Remove counter
  </button>

  ${repeat(() => counters, (getCounter) => Counter(getCounter()))}
`

// Needs to be exported in order for hot reload to work.
// Only one dev.hot() per file with no extra import.meta.hot.accept()
export const Counter = dev.hot(import.meta.hot, function (
  initialValue = 0
) {
  
  this.counter ??= initialValue

  return dev.syntax.html`
    <div>
      <button ${ref()
        .on('click', () => { this.counter++ })
      }>
        Click me
      </button>

      Clicked ${text(() => this.counter)} times
    </div>
  `
})
