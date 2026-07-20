// ==================== 发布流程暂注释（transitpkg 已不存在，链路待重建） ====================
//
// import { componentPath, pkgPath } from '../utils/paths'
// import run from '../utils/run'
// import { src, dest } from 'gulp'
//
// const copypackage = async () => {
//   return src(`${pkgPath}/transitpkg/**`).pipe(
//     dest(`${componentPath}/cjx-zdy-ui/`)
//   )
// }
//
// export const publish = async () => {
//   await run('pnpm version patch', `${pkgPath}/transitpkg`)
//   await copypackage()
//   await run('npm publish --access=public', `${componentPath}/cjx-zdy-ui`)
// }
//
// ========================================================================================

/**
 * 发布入口占位，避免旧脚本误用
 */
export const publish = async () => {
  console.warn(
    '[publish] 发布流程已暂时禁用：transitpkg 不存在，请重建后再启用 packages/components/script/publish'
  )
}
