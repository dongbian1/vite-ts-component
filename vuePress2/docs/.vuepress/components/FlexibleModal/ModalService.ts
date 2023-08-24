import { ComponentOptions, App, h, render, inject } from 'vue'

export const ModalSymbol = Symbol()

export class Props {
  data: { [key: string]: string | number }
  event: { [key: string]: (e: any) => void }
  components: Array<any>
}

export class ModalService {
  private _app: App | undefined = undefined

  constructor(app: App) {
    this._app = app
  }

  private container: HTMLDivElement

  public open(modal: ComponentOptions<any>, props?: Props) {
    if (!this._app) {
      throw Error('app is undefined')
    }
    this.container = document.createElement('div')

    document.body.appendChild(this.container)
    const vm = h(modal, {
      data: props?.data,
      components: props?.components,
      ...props?.event,
      onRemove: () => {
        this.close()
      }
    })
    vm.appContext = this._app?._context || null
    render(vm, this.container)
  }

  public close() {
    document.body.removeChild(this.container)
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
