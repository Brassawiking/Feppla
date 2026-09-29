import { createFeppla } from '../src/feppla.js'
export * from '../src/feppla.js'
export const { ref, dom: { repeat, text, when, html, defer }, dev } = createFeppla()
