/* EXAMPLE */
import { createFeppla } from '../../../src/feppla.js'
const { ref, dom: { repeat, text }, dev } = createFeppla()

const items = [
  { name: 'item-1' },
  { name: 'item-2' },
  { name: 'item-3' }
]

const addItem = () => {
  items.push({ 
    name: `item-${items.length + 1}` 
  })
}

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', addItem)
  }>
    Add more items
  </button>

  <ul>
    ${repeat({ 
      items: () => items, 
      key: (x) => x.name 
    }, (getItem, getIndex) => dev.syntax.html`
      <li>
        #${text(() => getIndex())}: ${text(() => getItem().name)}
      </li>
    `)}
  </ul>
`
