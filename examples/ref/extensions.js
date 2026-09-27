/* EXAMPLE */
import flatpickr from 'https://unpkg.com/flatpickr@4.6.13/dist/esm/index.js'
import flatpickrStyle from "https://unpkg.com/flatpickr@4.6.13/dist/flatpickr.min.css" with { type: "css" };
document.adoptedStyleSheets.push(flatpickrStyle)

import { createFeppla } from '../../src/feppla.js'
const { ref, dom: { text } } = createFeppla({
  extensions: {
    ref: {
      datepicker(getValue, setValue) {
        return this
          .init((el) => {
            const picker = flatpickr(el, {})
            return () => picker.destroy()
          })
          .property('value', getValue)
          .on('input', (event) => setValue(event.target.value))
      }
    }
  }
})

let date = '2026-10-04'

export default ($example) => $example.innerHTML = `
  <input ${ref()
    .datepicker(() => date, (value) => date = value)
  }>

  Date: ${text(() => date)}
`
