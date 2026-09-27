import { createFeppla } from '../src/feppla.js'
import { buildData } from './data.js'
const { ref, dom: { text, repeat } } = createFeppla()

let selected
let rows = []

function setRows(update = rows.slice()) {
  rows = update
}

function add() {
  rows = rows.concat(buildData(1000))
}

function remove(id) {
  rows.splice(
    rows.findIndex((d) => d.id === id),
    1
  )
  setRows()
}

function select(id) {
  selected = id
}

function run() {
  setRows(buildData())
  selected = undefined
}

function update() {
  const _rows = rows
  for (let i = 0; i < _rows.length; i += 10) {
    _rows[i].label += ' !!!'
  }
  setRows()
}

function runLots() {
  setRows(buildData(10000))
  selected = undefined
}

function clear() {
  setRows([])
  selected = undefined
}

function swapRows() {
  const _rows = rows
  if (_rows.length > 998) {
    const d1 = _rows[1]
    const d998 = _rows[998]
    _rows[1] = d998
    _rows[998] = d1
    setRows()
  }
}

document.querySelector('#app').innerHTML = `
  <div class="jumbotron">
    <div class="row">
      <div class="col-md-6">
        <h1>Feppla (keyed and non-keyed)</h1>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-sm-6 smallpad">
            <button 
              ${ref()
                .on('click', run)
              }
              type="button" 
              class="btn btn-primary btn-block" 
              id="run"
            >
              Create 1,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button 
              ${ref()
                .on('click', runLots)
              }
              type="button" 
              class="btn btn-primary btn-block" 
              id="runlots" 
            >
              Create 10,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button 
              ${ref()
                .on('click', add)
              }
              type="button" 
              class="btn btn-primary btn-block" 
              id="add"
            >
              Append 1,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button 
              ${ref()
                .on('click', update)
              }
              type="button" 
              class="btn btn-primary btn-block" 
              id="update" 
            >
              Update every 10th row
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button 
              ${ref()
                .on('click', clear)
              }
              type="button" 
              class="btn btn-primary btn-block" 
              id="clear" 
            >
              Clear
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button 
              ${ref()
                .on('click', swapRows)
              }
              type="button" 
              class="btn btn-primary btn-block" 
              id="swaprows" 
            >
              Swap Rows
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <table class="table table-hover table-striped test-data">
    <tbody>
      ${ 
        repeat({ items: () => rows, key: (row) => row.id }, (getRow) => `
        <tr ${ref()
          .class('danger', () => getRow().id === selected)
          .attribute('data-label', () => getRow().label)
        }>
          <td class="col-md-1">
            ${text(() => getRow().id)}
          </td>
          <td class="col-md-4">
            <a ${ref()
              .on('click', () => select(getRow().id))
            }>
              ${text(() => getRow().label)}
            </a>
          </td>
          <td class="col-md-1">
            <a ${ref()
              .on('click', () => remove(getRow().id))
            }>
              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </a>
          </td>
          <td class="col-md-6"></td>
        </tr>
      `)}
    </tbody>
  </table>

  <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
`
