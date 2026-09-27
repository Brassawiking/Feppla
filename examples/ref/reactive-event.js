/* EXAMPLE */
import { createFeppla, nextFrame } from '../../src/feppla.js'
const { ref, dom: { text } } = createFeppla({
  extensions: {
    ref: {
      reactive(getReactive, callback) {
        return this.init((el) => {
          callback(el, getReactive(el)) 
          
          const clickListener = () => {
            nextFrame(() => {
              callback(el, getReactive(el)) 
            })
          }
          document.addEventListener('click', clickListener, { capture: true })
          return () => document.removeEventListener('click', clickListener, { capture: true })
        })
      }
    }
  }
})

let counter = 0

export default ($example) => $example.innerHTML = `
  <button ${ref()
    .on('click', () => counter++)
  }>
    Click me
  </button>

  Clicked ${text(() => counter)} times
`
