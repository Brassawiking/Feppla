/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { dev } = createFeppla()

// Fully optional.
// Enables syntax highlighting in editors, otherwise a pure passthrough function.
// Use together with "lit-html" extension for VS Code or something similar.

export default ($example) => $example.innerHTML = dev.syntax.html`
  <div title="Hello!">
    Html syntax highlighted
  </div>
`
