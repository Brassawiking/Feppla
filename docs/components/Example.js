import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.12.0/es/highlight.min.js';
import hljsStyle from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.12.0/styles/base16/cupertino.min.css' with { type: 'css' }
document.adoptedStyleSheets.push(hljsStyle)

import { ref, dev } from '../feppla.js'

export const Example = dev.hot(import.meta.hot, function (
  example
) {
  const url = new URL(`examples/${example}.js`, location.href);

  this.examplePromise ??= Promise.all([
    import(url.href), 
    fetch(url).then(x => x.text())
  ])

  let module = null
  let raw = null

  this.examplePromise.then((example) => {
    [module, raw] = example
  })

  const getSourceCode = () => raw
    ?.split('/* EXAMPLE */')[1] // Remove HMR injected code
    .trim()
    .replace(`'../../src/feppla.js'`, `'feppla'`)

  return dev.syntax.html`
    <div class="example">
      <h2 class="example--heading">
        <a href="#${example}">
          ${example}
        </a>
      </h2>

      <pre class="example--code"><code ${ref()
        .watch(() => raw, ($container) => {
          if (raw) {
            $container.textContent = getSourceCode()
            hljs.highlightElement($container)
          } else {
            $container.innerHTML = '<progress></progress>'
          }
        })
      }></code></pre>

      <div class="example--live" ${ref()
        .watch(() => module, ($container) => {
          if (module) {
            $container.innerHTML = ''
            module.default($container)
          } else {
              $container.innerHTML = '<progress></progress>'
          }
        })
      }></div>
    </div>
  `
})