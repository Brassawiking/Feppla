import { checkAddedNode, nextFrame, strictEquals, observeRootForAddedNodes } from "./utils.js"
import { logError } from "./log.js"

let refIdGenerator = 0
const refPlaceholderCallbacks = new Map()

const processRef = (node, refId) => {
  const callback = refPlaceholderCallbacks.get(refId)
  if (callback) {
    callback(node)
    refPlaceholderCallbacks.delete(refId)
    nextFrame(() => {
      node.removeAttribute('_feppla_ref_')
    })
  }
}

checkAddedNode((node) => {
  if (node.nodeType === Node.ELEMENT_NODE) {
    const refId = node.getAttribute('_feppla_ref_')
    if (refId) {
      processRef(node, +refId)
    }
    const childRefs = node.querySelectorAll('[_feppla_ref_]')
    for (let i = 0; i < childRefs.length; ++i) {
      const $child = childRefs[i]
      processRef($child, +$child.getAttribute('_feppla_ref_')) 
    }
  }
})

export const createRef = (extensions) => {
  const FepplaRef = class {
    #explicitNode = null

    #tryNodeCallback(callback, node) {
      try {
        callback.call(this.state, node)
      } catch(error) {
        logError('Unhandled error in ref() call!', error)
      }
    }

    constructor(explicitNode) {
      this.#explicitNode = typeof explicitNode === 'string'
        ? document.querySelector(explicitNode)
        : explicitNode
    }

    state = {
      refCallbacks: []
    }

    toString() {
      if (this.#explicitNode) {
        logError('Used deferred referencing with explicit node reference!')
        return ''
      }

      const refPlaceholderId = refIdGenerator++
      refPlaceholderCallbacks.set(refPlaceholderId, (implicitNode) => {
        const callbacks = this.state.refCallbacks
        for (let i = 0 ; i < callbacks.length ; ++i) {
          this.#tryNodeCallback(callbacks[i], implicitNode)
        }
        this.state.refCallbacks = null
      })
      return `_feppla_ref_="${refPlaceholderId}"`
    }

    node(callback) {
      if (this.#explicitNode) {
        this.#tryNodeCallback(callback, this.#explicitNode)
      } else {
        this.state.refCallbacks.push(callback)
      }
      return this
    }

    on(type, listener, options = {}) {
      return this.node((el) => el.addEventListener(type, listener, options))
    }

    shadow(template, options) {
      return this.node((node) => {
        const shadow = node.attachShadow({ mode: 'open', ...options })
        observeRootForAddedNodes(shadow)
        shadow.innerHTML = template
      })
    }

    init(callback) {
      return this.node((el) => {
        const cleanup = callback.call(this.state, el)
        if (!cleanup) return

        nextFrame(function checkCleanup() {
          if (el.isConnected) {
            nextFrame(checkCleanup)
          } else {
            cleanup()
          }
        })
      })
    }

    live(callback, cleanup) {
      return this.init((el) => {
        callback.call(this.state, el)
        let running = true
        const update = () => {
          if (!running) return

          callback.call(this.state, el)
          nextFrame(update)
        }
        nextFrame(update)
        return () => {
          running = false
          cleanup?.()
        }
      })
    }

    reactive(getReactive, callback) {
      return this.live((el) => { 
        const value = getReactive(el)
        callback(el, value) 
      })
    }

    watch(getValueOrOptions, callback) {
      const shorthand = typeof getValueOrOptions === 'function'
      const { getValue, compare, getOldValue } = {
        getValue: shorthand ? getValueOrOptions : undefined,
        compare: strictEquals,
        getOldValue: (newValue) => newValue,
        ...(shorthand ? {} : getValueOrOptions)
      }

      let oldValue = Symbol("[Feppla] Initial old value for set")
      return this.reactive(
        getValue,
        (el, newValue) => {
          if (!compare(newValue, oldValue)) {
            callback.call(this.state, el, newValue, oldValue)
            oldValue = getOldValue(newValue)
          }
        }
      )
    }

    property(property, getValue) {
      return this.watch(getValue, (el, value) => el[property] = value)
    }

    attribute(attribute, getValue) {
      return this.watch(getValue, (el, value) => 
        value != null 
          ? el.setAttribute(attribute, value) 
          : el.removeAttribute(attribute)
      )
    }

    class(className, getActive) {
      return this.watch(getActive, (el, active) => el.classList.toggle(className, !!active))
    }

    style(property, getValue) {
      return this.watch(getValue, (el, valueOrOptions) => {
        const shorthand = valueOrOptions == null || typeof valueOrOptions !== 'object'
        const { value, important } = {
          value: shorthand ? valueOrOptions : undefined,
          important: false,
          ...(shorthand ? {} : valueOrOptions)
        }
        
        el.style.setProperty(property, value, important ? 'important' : '')
      })
    }
  }

  Object.assign(FepplaRef.prototype, extensions ?? {})

  return (explicitNode) => new FepplaRef(explicitNode)
}
