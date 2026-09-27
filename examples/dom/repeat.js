/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { repeat, text } } = createFeppla()

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

export default ($example) => $example.innerHTML = `
  <button ${ref()
    .on('click', addItem)
  }>
    Add more items
  </button>

  <ul>
    ${repeat(() => items, (getItem, getIndex) => `
      <li>
        #${text(() => getIndex())}: ${text(() => getItem().name)}
      </li>
    `)}
  </ul>
`
