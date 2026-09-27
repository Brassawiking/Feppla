import { logError } from './log.js'

export const strictEquals = (a, b) => a === b
export const shallowEquals = (a, b) => equals(a, b, strictEquals)
export const deepEquals = (a, b) => equals(a, b, deepEquals)

function equals(a, b, partialCompare) {
  if (a === b) return true

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((element, index) => partialCompare(element, b[index]))
  }

  if (a && typeof a === 'object' && b && typeof b === 'object') {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    return keysA.length === keysB.length && keysA.every((key) => partialCompare(a[key], b[key]))
  }

  return false
}

let frameQueueA = []
let frameQueueB = []
let frameQueue = frameQueueA
requestAnimationFrame(function processFrameQueue() {
  let currentQueue = frameQueue
  frameQueue = frameQueue === frameQueueA
    ? frameQueueB
    : frameQueueA
  frameQueue.length = 0
  for (let i = 0 ; i < currentQueue.length; ++i) {
    try {
      currentQueue[i]()
    } catch (err) {
      logError('Unhandled error in nextFrame() callback!', err)
    }
  }
  currentQueue = null
  requestAnimationFrame(processFrameQueue)
})
export const nextFrame = (callback) => frameQueue.push(callback) 

const checkAddedNodeCallbacks = []
export const checkAddedNode = (callback) => checkAddedNodeCallbacks.push(callback)
export const observeRootForAddedNodes = (root) => {
  new MutationObserver((mutations) => {
    for (let i = 0 ; i < mutations.length; ++i) {
      const m = mutations[i]
      for (let j = 0; j < m.addedNodes.length ; ++j) {
        const node = m.addedNodes[j]
        for (let k = 0; k < checkAddedNodeCallbacks.length; ++k) {
          checkAddedNodeCallbacks[k](node)
        }
      }
    }
  }).observe(root, { childList: true, subtree: true })
}

observeRootForAddedNodes(document)
