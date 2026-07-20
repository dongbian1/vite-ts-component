import { series } from 'gulp'
import { removeDist, buildStyle, buildComponent } from './index'

/** 本地可导出的 gulp 任务类型，避免依赖 undertaker 深层路径 */
type GulpTask = () => void | Promise<void>

/**
 * 组件库全量构建：清理 → vite 打 JS/类型 → gulp 编样式
 */
const build: GulpTask = series(
  async () => removeDist(),
  async () => buildComponent(),
  async () => buildStyle()
) as GulpTask

export default build
