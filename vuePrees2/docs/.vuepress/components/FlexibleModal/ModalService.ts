import { ComponentOptions, App, h, render, inject } from 'vue'

export const ModalSymbol = Symbol()

export class ModalResult {
  type: 'ok' | 'cancel' = 'ok'
  data?: any = undefined
}

export class ModalService {
  private _app: App | undefined = undefined

  constructor(app: App) {
    this._app = app
  }

  public open(modal: ComponentOptions<any>, props?: any): Promise<ModalResult> {
    return new Promise((resolve, reject) => {
      if (!this._app) {
        reject('app is undefined')
      }

      const container = document.createElement('div')
      document.body.appendChild(container)

      const vm = h(modal, {
        ...props,
        onOK: (data: any) => {
          document.body.removeChild(container)
          resolve(this.setResult('ok', data))
        },
        onCancel: () => {
          document.body.removeChild(container)
          resolve(this.setResult('cancel'))
        }
      })
      vm.appContext = this._app?._context || null
      render(vm, container)
    })
  }

  public setResult(type: 'ok' | 'cancel', data?: any): ModalResult {
    const result = new ModalResult()
    result.type = type
    result.data = data
    return result
  }
}

export const useModal = (): ModalService => {
  const dynamicModal = inject<ModalService>(ModalSymbol)
  if (!dynamicModal) {
    throw new Error('No dyModal provided!')
  }
  return dynamicModal
}

const plugin = {
  install: (app: App, options?: { [key: string]: any }) => {
    const dynamicModal = new ModalService(app)
    app.config.globalProperties.$dyModal = dynamicModal
    app.provide(ModalSymbol, dynamicModal)
  }
}

export default plugin
