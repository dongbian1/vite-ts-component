import * as components from '../index'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CButton: typeof components.Button
    CDragTable: typeof components.DragTable
    CGrid: typeof components.Grid
    CGridItem: typeof components.GridItem
    CSearchForm: typeof components.SearchForm
    CProTable: typeof components.ProTable
  }
}
export {}
