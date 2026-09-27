/* EXAMPLE */
import { signal, effect } from 'https://cdn.jsdelivr.net/npm/@preact/signals-core/+esm'
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { text } } = createFeppla({
  extensions: {
    ref: {
      reactive(getReactive, callback) {
        return this.init((el) => { 
          const dispose = effect(() => { 
            callback(el, getReactive(el).value) 
          })
          return dispose
        })
      }
    }
  }
})

let counter = signal(0)

export default ($example) => $example.innerHTML = `
  <button ${ref()
    .on('click', () => counter.value++)
  }>
    Click me
  </button>

  Clicked ${text(() => counter)} times
`
