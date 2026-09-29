import { ref, repeat, when, dev } from './feppla.js'
import { Example } from './components/Example.js'
import { examples } from './examples.js'

const version = fetch('./package.json').then((x) => x.json()).then(x => x.version)

ref(document)
  .property('title', () => location.hash 
    ? `${location.hash.slice(1).toLowerCase()} | Feppla` 
    : 'Feppla'
  )

ref(document.head.appendChild(document.createElement("link")))
  .init((el) => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 16

    const ctx = canvas.getContext('2d')
    ctx.lineWidth = 2
    ctx.strokeStyle = '#333'
    ctx.fillStyle = `hsl(${(Math.random() * 50000) % 360}, 70%, 50%)`
    ctx.fillRect(0, 0, 16, 16)
    ctx.strokeRect(0, 0, 16, 16)

    el.rel = 'shortcut icon'
    el.type = 'image/x-icon'
    el.href = canvas.toDataURL("image/x-icon")
  })

const filterExamples = (example) => 
  !location.hash 
  || example.toLowerCase() === location.hash.slice(1).toLowerCase()

const clearFilter = () => {
  history.replaceState(null, '', location.pathname + location.search)
}

document.querySelector('#app').innerHTML = dev.syntax.html`
  <header>
    <h1>
      <span>Feppla JS</span>
      <span ${ref()
        .property('textContent', () => version)
      }></span>
    </h1>

    <span>[ˈfɛpːla] — Swedish slang for tinkering</span>
    <span>
      <a href="https://github.com/Brassawiking/Feppla" target="_blank">Github</a>
    </span>
  </header>

  <pre class="install-instructions"><code>${`\
{
  "dependencies": {
    // Latest
    "feppla": "github:brassawiking/feppla"

    // Pinned version: <a href="https://github.com/Brassawiking/Feppla/tags" target="_blank">List of available versions</a>
    "feppla": "github:brassawiking/feppla#v0.1.0"
  }
}
`}</pre></code>

  ${when(() => location.hash, () => dev.syntax.html`
    <button class="clear-filter" ${ref()
      .on('click', clearFilter)
    }>
      Clear filter
    </button>  
  `)}

  ${repeat(
    { 
      items: () => examples.filter(filterExamples),
      key: (x) => x 
    }, 
    (getCase) => Example(getCase())
  )}
`
