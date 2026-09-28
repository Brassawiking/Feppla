import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.12.0/es/highlight.min.js';
import hljsStyle from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.12.0/styles/base16/cupertino.min.css' with { type: 'css' }
document.adoptedStyleSheets.push(hljsStyle)

import { ref, dev } from '../feppla.js'

export const Example = dev.hot(import.meta.hot, function (
  example
) {
  const url = new URL(`docs/examples/${example}.js`, location.href);

  this.modulePromise ??= import(url.href)
  this.rawPromise ??= fetch(url).then(x => x.text())

  const getSourceCode = (raw) => raw
    ?.split('/* EXAMPLE */')[1] // Remove HMR injected code
    .trim()
    .replace(`'../../../src/feppla.js'`, `'feppla'`)

  return dev.syntax.html`
    <div class="example">
      <h2 class="example--heading">
        <a href="#${example}">
          ${example}
        </a>
      </h2>

      <pre class="example--code"><code ${ref()
        .watch(() => this.rawPromise, ($container, raw) => {
          $container.textContent = getSourceCode(raw)
          hljs.highlightElement($container)
        })
      }>
        <progress></progress>
      </code></pre>


      <div class="example--live" ${ref()
        .watch(() => this.modulePromise, ($container, module) => {
          $container.innerHTML = ''
          module.default($container)
        })
      }>
        <progress></progress>  
      </div>
    </div>
  `
})