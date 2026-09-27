import { checkAddedNode, nextFrame, shallowEquals } from './utils.js'
import { logError } from "./log.js"

let domIdGenerator = 0
const domPlaceholderCallbacks = new Map()
const renderTemplate = document.createElement('template') 

const checkAndProcessCommentNode = (node) => {
  const domPlaceholderId = node.data
  if (domPlaceholderId.startsWith("_feppla_dom_")) {
    const cursor = node.parentNode.insertBefore(document.createTextNode(''), node)
    node.data = ''
    domPlaceholderCallbacks.get(domPlaceholderId)(cursor)
    domPlaceholderCallbacks.delete(domPlaceholderId)

    nextFrame(() => {
      node.remove()
    })
  }
}

checkAddedNode((node) => {
  if (node.nodeType === Node.COMMENT_NODE) {
    checkAndProcessCommentNode(node)
    return
  }

  const walker = document.createTreeWalker(node, NodeFilter.SHOW_COMMENT)

  let currentCommentNode = walker.nextNode()
  while (currentCommentNode) {
    const nextCommentNode = walker.nextNode()
    checkAndProcessCommentNode(currentCommentNode)
    currentCommentNode = nextCommentNode
  }
})

export const createDom = (extensions) => {
  return {
    modify(callback) {
      const domPlaceholderId = `_feppla_dom_${domIdGenerator++}_`
      domPlaceholderCallbacks.set(domPlaceholderId, callback)
      return `<!--${domPlaceholderId}-->`
    },

    text(getText) {
      return this.dom.modify((cursor) => {
        this.ref(cursor).property('textContent', getText)
      })
    },

    block(callback) {
      return this.dom.modify((cursor) => {
        const startNode = document.createTextNode('')
        const endNode = cursor
        endNode.before(startNode)

        callback({
          startNode,
          endNode,
          clearBlock: () => {
            let node = startNode.nextSibling
            while (node && node != endNode) {
              node.remove()
              node = startNode.nextSibling
            }
            if (node !== endNode) {
              logError('html() end point is missing!')
              return
            }
          }
        })
      })
    },

    html(getHtml) {
      return this.dom.block(({ startNode, clearBlock }) => {
        this.ref(startNode)
          .watch(getHtml, (_, html) => {
            clearBlock()
            renderTemplate.innerHTML = html
            startNode.after(...renderTemplate.content.childNodes)
          })
      })
    },

    repeat(getItemsOrOptions, renderItem) {
      return this.dom.block(({ startNode, endNode, clearBlock }) => {
        const shorthand = typeof getItemsOrOptions === 'function'
        const { items: getValue, key: getKey, compare, getOldValue } = {
          items: shorthand ? getItemsOrOptions : undefined,
          key: (_, index) => index,
          compare: shallowEquals,
          getOldValue: (newValue) => [...newValue],
          ...(shorthand ? {} : getItemsOrOptions)
        }

        const repeatItemIdentifier = Symbol('repeatItemIdentifier')
        this.ref(startNode)
          .watch(
            {
              getValue,
              compare,
              getOldValue
            },
            (_, newItems) => {
              if (!newItems.length) {
                clearBlock()
                return
              }

              const newKeys = newItems.map((item, index) => getKey(item, index))
              const newKeysLookup = new Set(newKeys)

              if (newKeysLookup.size !== newKeys.length) {
                logError('repeat() keys must be unique!')
                return
              }

              const buckets = new Map()
              const parent = endNode.parentNode
              const parsingTag = parent instanceof SVGElement ? 'svg' : 'template'

              let currentBucket = null
              let currentNode = startNode.nextSibling
              while (currentNode != endNode) {
                if (currentNode == null) {
                  logError('repeat() end point is missing!')
                  return
                }

                if (
                  '__feppla_repeat_key__' in currentNode 
                  && currentNode.__feppla_repeat_identifier__ === repeatItemIdentifier
                ) {
                  currentBucket = [currentNode]
                  buckets.set(currentNode.__feppla_repeat_key__, currentBucket)
                } else {
                  currentBucket.push(currentNode)
                }

                currentNode = currentNode.nextSibling
              }

              for (const [key, bucket] of buckets) {
                if (newKeysLookup.has(key)) continue

                for (let i = 0; i < bucket.length; ++i) {
                  bucket[i].remove()
                }
                buckets.delete(key)
              }

              let htmlToParse = ''
              for (let i = 0; i < newItems.length; ++i) {
                const item = newItems[i]
                const key = newKeys[i]
                let bucket = buckets.get(key)

                if (!bucket) {
                  bucket = []
                  
                  const startItemNode = document.createTextNode('')
                  startItemNode.__feppla_repeat_key__ = key
                  startItemNode.__feppla_repeat_item__ = item
                  startItemNode.__feppla_repeat_index__ = i
                  startItemNode.__feppla_repeat_identifier__ = repeatItemIdentifier
                  startItemNode.__feppla_repeat_added__ = true
                  bucket.push(startItemNode)

                  const html = renderItem(
                    () => startItemNode.__feppla_repeat_item__, 
                    () => startItemNode.__feppla_repeat_index__
                  ).trim()

                  htmlToParse += `<${parsingTag}>${html}</${parsingTag}>`
                  buckets.set(key, bucket)
                } else {
                  const startItemNode = bucket[0]
                  startItemNode.__feppla_repeat_item__ = item
                  startItemNode.__feppla_repeat_index__ = i

                  htmlToParse += '<!---->'
                }
              }
              renderTemplate.innerHTML = htmlToParse

              currentNode = startNode.nextSibling
              for (let i = 0; i < newItems.length; ++i) {
                const key = newKeys[i]
                let bucket = buckets.get(key)

                if (bucket[0].__feppla_repeat_added__) {
                  delete bucket[0].__feppla_repeat_added__
                  const renderContainer = renderTemplate.content.childNodes[i]
                  bucket.push(
                    ...(
                      renderContainer.tagName === 'TEMPLATE'
                        ? renderContainer.content.childNodes
                        : renderContainer.childNodes
                    )
                  )
                }

                for (let j = 0; j < bucket.length; ++j) {
                  const node = bucket[j]
                  if (currentNode !== node) {
                    parent.insertBefore(node, currentNode)
                  } else {
                    currentNode = currentNode.nextSibling
                  }
                }
              }
            }
          )
      })
    },

    when(getValueOrOptions, renderTemplate) {
      const shorthand = typeof getValueOrOptions === 'function'
      const { value: getValue } = {
        value: shorthand ? getValueOrOptions : undefined,
        ...(shorthand ? {} : getValueOrOptions)
      }

      return this.dom.repeat(
        {
          items: () => [getValue()].filter(Boolean),
          key: (value) => value
        },
        () => renderTemplate(getValue)
      )
    },

    ...extensions
  }
}
