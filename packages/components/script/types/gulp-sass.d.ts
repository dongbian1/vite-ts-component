declare module 'gulp-sass' {
  import type { Options as SassOptions } from 'sass'
  import type { Transform } from 'stream'

  interface GulpSass {
    (options?: SassOptions): Transform
    logError(error: Error): void
  }

  type Compiler = typeof import('sass')

  function gulpSass(compiler: Compiler): GulpSass

  export default gulpSass
}
