import { spawn } from 'child_process'

/**
 * 在指定目录执行 shell 命令，非 0 退出码视为失败
 */
export default async (command: string, path: string) => {
  const [cmd, ...args] = command.split(' ')
  return new Promise<void>((resolve, reject) => {
    const app = spawn(cmd, args, {
      cwd: path,
      stdio: 'inherit',
      shell: true
    })
    app.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`命令执行失败(${code}): ${command}`))
    })
    app.on('error', reject)
  })
}
