/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { block } } = createFeppla()

export default ($example) => $example.innerHTML = `
  (Before)

  ${block(({ startNode, endNode, clearBlock }) => {
    ref(startNode)
      .init(() => {
        let counter = 0
        const timer = setInterval(() => {
          if (++counter > 5) {
            counter = 0
            clearBlock()
          } else {
            const $text = document.createTextNode(counter)
            endNode.before($text)
          }
        }, 1000)
        return () => clearInterval(timer)
      })
  })}

  (After)
`
