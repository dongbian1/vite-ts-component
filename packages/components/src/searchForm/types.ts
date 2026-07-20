import type { ColumnProps } from '@/proTable/types'
import type { BreakPoint } from '@/grid/types'

export interface SearchFormProps {
  columns?: ColumnProps[]
  searchParam?: { [key: string]: any }
  searchCol: number | Record<BreakPoint, number>
  search: (params: any) => void
  reset: (params: any) => void
  loading?: boolean
}
