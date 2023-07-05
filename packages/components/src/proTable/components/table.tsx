import { Slots } from 'vue'
import { ColumnProps, RenderScope, HeaderRenderScope } from '../types'
import {
  filterEnum,
  formatValue,
  handleProp,
  handleRowAccordingToProp
} from '@npm_cjx/utils'

const RenderTableColumn = (
  item: ColumnProps,
  enumMap: Map<any, any>,
  slots: Slots
) => {
  // 获取 tag 类型
  const getTagType = (item: ColumnProps, scope: RenderScope<any>) => {
    return filterEnum(
      handleRowAccordingToProp(scope.row, item.prop!),
      enumMap.get(item.prop),
      item.fieldNames,
      'tag'
    )
  }

  // 渲染表格数据
  const renderCellData = (item: ColumnProps, scope: RenderScope<any>) => {
    return enumMap.get(item.prop) && item.isFilterEnum
      ? filterEnum(
          handleRowAccordingToProp(scope.row, item.prop!),
          enumMap.get(item.prop)!,
          item.fieldNames
        )
      : formatValue(handleRowAccordingToProp(scope.row, item.prop!))
  }

  return (
    <>
      {!item.hideInTable && (
        <el-table-column
          {...item}
          align={item.align ?? 'center'}
          showOverflowTooltip={
            item.showOverflowTooltip ?? item.prop !== 'action'
          }
        >
          {{
            default: item.formatter
              ? undefined
              : (scope: RenderScope<any>) => {
                  if (item._children)
                    return item._children.map((child) =>
                      RenderTableColumn(child, enumMap, slots)
                    )
                  if (item.render) return item.render(scope)
                  if (slots[handleProp(item.prop!)])
                    return slots[handleProp(item.prop!)]!(scope)
                  if (item.isTag)
                    return (
                      <el-tag type={getTagType(item, scope)}>
                        {renderCellData(item, scope)}
                      </el-tag>
                    )
                  return renderCellData(item, scope) ?? ''
                },
            header: (scope: HeaderRenderScope<any>) => {
              if (item.headerRender) return item.headerRender(scope)
              if (slots[`${handleProp(item.prop!)}Header`])
                return slots[`${handleProp(item.prop!)}Header`]!(scope)
              return item.label
            }
          }}
        </el-table-column>
      )}
    </>
  )
}

export default RenderTableColumn
