const hmrEnabled = !!import.meta.hot

export const createDev = (extensions) => {
  return {
    hot(importMetaHot, createInstance) {
      if (!hmrEnabled) {
        return (...options) => createInstance.apply({}, options)
      }

      const component = Object.assign(
        (...options) => {
          const state = {}
          const instance = {
            options,
            state,
            template: component.createInstance.apply(state, options)
          }
      
          const id = component.instanceIdGenerator++
          component.instances.set(id, instance)
      
          return this.dom.when(
            () => component.instances.get(id),
            (getInstance) => getInstance().template
          )
        },
        {
          instances: new Map(),
          instanceIdGenerator: 0,
          createInstance,
          __feppla_dev_hot__: true
        }
      )
      
      importMetaHot.accept((module) => {
        const newComponent = Object.values(module).find(x => x?.__feppla_dev_hot__)
        if (!newComponent) {
          importMetaHot.invalidate()
          return
        }

        component.createInstance = newComponent.createInstance

        for (const [id, oldInstance] of component.instances) {
          const options = oldInstance.options
          const state = { ...oldInstance.state }
          const newInstance = {
            options,
            state,
            template: component.createInstance.apply(state, options)
          }
          component.instances.set(id, newInstance)
        }
      })
    
      return component
    },

    ...extensions
  }
}
