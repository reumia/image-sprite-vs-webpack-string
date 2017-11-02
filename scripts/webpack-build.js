import webpack from 'webpack'
import rimraf from 'rimraf'
import path from 'path'

import BUILD_CONFIG from '../configs/webpack.config'

const compiler = webpack(BUILD_CONFIG)

rimraf(path.resolve(__dirname, './dist/bundle'), err => {
    if (err) throw err

    compiler.run((err, stats) => {

        if (err) throw(err)

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        console.log(`Build complete.`)
    })
})