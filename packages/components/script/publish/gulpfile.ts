import { series } from 'gulp'
import { publish } from './index'

type GulpTask = () => void | Promise<void>

// 发布暂禁用，仅输出提示
const publishTask: GulpTask = series(async () => publish()) as GulpTask

export default publishTask
