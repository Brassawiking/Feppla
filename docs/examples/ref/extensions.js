/* EXAMPLE */
import flatpickr from 'https://unpkg.com/flatpickr@4.6.13/dist/esm/index.js'
if (!document.querySelector('#flatpickrStyle')) {
  const link = document.createElement('link')
  link.id = 'flatpickrStyle'
  link.rel = 'stylesheet'
  link.href = 'https://unpkg.com/flatpickr@4.6.13/dist/flatpickr.min.css'
  document.head.append(link)
}

import { createFeppla } from '../../../src/feppla.js'
const { ref, dom: { text }, dev } = createFeppla({
  extensions: {
    ref: {
      datepicker(getValue, setValue) {
        return this
          .init((el) => {
            const picker = flatpickr(el, { disableMobile: true })
            return () => picker.destroy()
          })
          .property('value', getValue)
          .on('input', (event) => setValue(event.target.value))
      }
    }
  }
})

let date = '2026-10-04'

export default ($example) => $example.innerHTML = dev.syntax.html`
  <input ${ref()
    .datepicker(() => date, (value) => date = value)
  }>

  Date: ${text(() => date)}
`
