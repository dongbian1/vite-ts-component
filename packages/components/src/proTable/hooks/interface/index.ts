export namespace Table {
  export interface Pageable {
    pageNum: number
    pageSize: number
    total: number
  }
  export interface TableStateProps {
    loading: boolean
    tableData: any[]
    pageable: Pageable
    sortParam: {
      [key: string]: 'ascending' | 'descending'
    }
    searchParam: {
      [key: string]: any
    }
    searchInitParam: {
      [key: string]: any
    }
    totalParam: {
      [key: string]: any
    }
    tabsVal: string | number
    icon?: {
      [key: string]: any
    }
  }
}
