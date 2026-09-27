/* EXAMPLE */
import { BehaviorSubject } from 'https://cdn.jsdelivr.net/npm/rxjs@7/+esm'
import { createFeppla } from '../../../src/feppla.js'
const { ref, dom: { text }, dev } = createFeppla({
  extensions: {
    ref: {
      reactive(getReactive, callback) {
        return this.init((el) => { 
          const subscription = getReactive(el).subscribe((value) => {
            callback(el, value) 
          })
          return () => subscription.unsubscribe()
        })
      },
    }
  }
})

let counter = new BehaviorSubject(0)

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => counter.next(counter.value + 1))
  }>
    Click me
  </button>

  Clicked ${text(() => counter)} times
`
