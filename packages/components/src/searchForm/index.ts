import searchForm from './searchForm.vue'
import { withInstall } from '@utils/index'

export type { SearchFormProps } from './types'

const SearchForm = withInstall(searchForm)
export default SearchForm
