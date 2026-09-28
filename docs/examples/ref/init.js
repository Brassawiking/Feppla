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
const { ref, dom: { text, when }, dev } = createFeppla()

let showDatepicker = false
let date = '2026-10-04'

export default ($example) => $example.innerHTML = dev.syntax.html`
  <button ${ref()
    .on('click', () => { showDatepicker = !showDatepicker})
  }>
    Toggle datepicker
  </button>

  Date: ${text(() => date)}

  ${when(() => showDatepicker, () => `
    <input ${ref()
      .property('value', () => date)
      .on('input', (event) => date = event.target.value)
      .init((el) => {
        const picker = flatpickr(el, { disableMobile: true })
        return () => picker.destroy()
      })
    }>
  `)}
`
