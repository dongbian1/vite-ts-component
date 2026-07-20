import fs from 'fs'
import { resolve } from 'path'
import { componentPath } from './paths'

const stayFile = ['package.json', 'README.md']

/**
 * 递归清理目录，保留指定文件
 */
const delPath = async (path: string) => {
  if (!fs.existsSync(path)) return

  const files = fs.readdirSync(path)

  for (const file of files) {
    const curPath = resolve(path, file)

    if (fs.statSync(curPath).isDirectory()) {
      if (file === 'node_modules') continue
      await delPath(curPath)
    } else if (!stayFile.includes(file)) {
      fs.unlinkSync(curPath)
    }
  }

  // 根产物目录本身不删，只清内容
  if (path !== `${componentPath}/cjx-zdy-ui`) {
    const remain = fs.readdirSync(path)
    if (remain.length === 0) fs.rmdirSync(path)
  }
}

export default delPath
