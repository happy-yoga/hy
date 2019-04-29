const args = require('args')
const imagemin = require('imagemin')

const imageminPngquant = require('imagemin-pngquant')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminSvgo = require('imagemin-svgo')

args.option(
  'source-directory',
  'image directory that should be optimized',
  '',
  requiredCheck('--source-directory')
)

args.option(
  'output-directory',
  'target directory for the optimization',
  '',
  requiredCheck('--output-directory')
)

const flags = args.parse(process.argv)

const build = async (sourceDir, outputDir) => {
  const files = await imagemin(
    [`${sourceDir}/*.{jpg,jpeg,png,svg}`],
    outputDir,
    {
      plugins: [
        imageminMozjpeg(),
        imageminPngquant({ quality: [0.65, 0.8] }),
        imageminSvgo()
      ]
    }
  )

  console.log(`Optimized Files:\n  ${files.map(f => f.path).join('\n  ')}`)
}

build(flags.sourceDirectory, flags.outputDirectory)
  .then(() => {
    console.log('finished optimizing of images')
  })
  .catch(e => {
    throw e
  })

function requiredCheck (option) {
  return val => {
    if (!val) {
      throw new Error(`${option} is missing`)
    }
    return val
  }
}
