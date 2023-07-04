export type Columns = {
  /**
   * 列名
   * @type String
   */
  title: string

  /**
   * 列数据在数据项中对应的 key
   * @type String
   */
  prop: string

  /**
   * 格式化函数
   * @param row 当前行数据
   * @returns string
   */
  formatter?: (row: any) => string

  /**
   * 自定义渲染函数
   * @param row 当前行数据
   * @returns JSX.Element
   */
  render?: (row: any) => JSX.Element
}
