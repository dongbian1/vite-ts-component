import { src, dest } from 'gulp'
import { componentPath } from '../utils/paths'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import delpath from '../utils/delpath'
import run from '../utils/run'

const sass = gulpSass(dartSass)

/**
 * 删除打包产物目录（保留 package.json / README.md）
 */
export const removeDist = async () => {
  await delpath(`${componentPath}/cjx-zdy-ui`)
}

/**
 * 编译组件样式（scss → css）
 */
export const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**/*.scss`)
    .pipe(
      sass({
        // 消除 legacy-js-api 弃用警告
        silenceDeprecations: ['legacy-js-api']
      }).on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(dest(`${componentPath}/cjx-zdy-ui/lib/src`))
    .pipe(dest(`${componentPath}/cjx-zdy-ui/es/src`))
}

/**
 * 调用 vite 打包组件
 */
export const buildComponent = async () => {
  await run('pnpm run build', componentPath)
}
