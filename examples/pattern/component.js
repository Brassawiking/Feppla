/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { text }, dev } = createFeppla()

const Counter = (initialValue = 0) => {
  let counter = initialValue

  return dev.syntax.html`
    <div>
      <button ${ref()
        .on('click', () => { counter++ })
      }>
        Click me
      </button>

      Clicked ${text(() => counter)} times
    </div>
  `
}

export default ($example) => $example.innerHTML = `
  ${Counter()}
  ${Counter(42)}
  ${Counter(-5)}
`
