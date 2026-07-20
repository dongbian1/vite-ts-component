import { spawnSync } from 'node:child_process'
import { existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 部署 VitePress 文档到 GitHub Pages（gh-pages）
 * 地址：https://dongbian1.github.io/vite-ts-component/
 */

const root = dirname(fileURLToPath(import.meta.url))
const dist = join(root, 'docs', '.vitepress', 'dist')
const isWin = process.platform === 'win32'

/**
 * 读取仓库 origin，优先跟日常推送方式一致
 */
function getRemote() {
  const result = spawnSync('git', ['remote', 'get-url', 'origin'], {
    cwd: root,
    encoding: 'utf8'
  })
  const url = result.stdout?.trim()
  return url || 'https://github.com/dongbian1/vite-ts-component.git'
}

const remote = getRemote()

/**
 * 执行命令（git 不用 shell，避免 Windows 把 -m 参数拆碎）
 */
function run(command, args, cwd = root, useShell = false) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: useShell
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

console.log('>>> 构建文档...')
run(isWin ? 'pnpm.cmd' : 'pnpm', ['docs:build'], root, true)

if (!existsSync(dist)) {
  console.error(`错误：未找到构建产物 ${dist}`)
  process.exit(1)
}

writeFileSync(join(dist, '.nojekyll'), '')

const stamp = new Date().toISOString().slice(0, 19)
console.log('>>> 推送到 gh-pages...')
run('git', ['init'], dist)
run('git', ['checkout', '-B', 'main'], dist)
run('git', ['add', '-A'], dist)
run('git', ['commit', '-m', `deploy: docs ${stamp}`], dist)
run('git', ['push', '-f', remote, 'HEAD:gh-pages'], dist)

console.log('>>> 部署完成')
console.log('请确认仓库 Settings → Pages → Branch 选择 gh-pages / root')
console.log('文档地址：https://dongbian1.github.io/vite-ts-component/')
