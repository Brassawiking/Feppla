/* EXAMPLE */
import { createFeppla } from '../../src/feppla.js'
const { ref } = createFeppla()

export default ($example) => $example.innerHTML = `
  <canvas width="64" height="64" ${ref()
    .init(function (el) {
      this.ctx = el.getContext('2d')
      this.ctx.lineWidth = 5
      this.ctx.strokeStyle = '#333'
    })
    .live(function (el) {
      this.ctx.fillStyle = `hsl(${(performance.now() / 30) % 360}, 70%, 50%)`
      this.ctx.fillRect(0, 0, el.width, el.height)

      this.ctx.strokeRect(
        this.ctx.lineWidth / 2,
        this.ctx.lineWidth / 2,
        el.width - this.ctx.lineWidth,
        el.height - this.ctx.lineWidth
      )
    })
  }></canvas>
`
