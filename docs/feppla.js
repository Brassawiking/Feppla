import { createFeppla } from '../src/feppla.js'
export * from '../src/feppla.js'
export const { ref, dom: { repeat, text, when }, dev } = createFeppla()
