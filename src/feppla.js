import { createRef } from './ref.js'
import { createDom } from './dom.js'
import { createDev } from './dev.js'

export const createFeppla = (options) => {
  const feppla = {
    ref: createRef(options?.extensions?.ref),
    dom: createDom(options?.extensions?.dom),
    dev: createDev(options?.extensions?.dev)
  }

  for (const key of Object.keys(feppla.dom)) {
    feppla.dom[key] = feppla.dom[key].bind(feppla)
  }

  for (const key of Object.keys(feppla.dev)) {
    feppla.dev[key] = feppla.dev[key].bind(feppla)
  }
  
  return feppla
}

export * from './utils.js'
