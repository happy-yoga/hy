const path = require('path')

class AssetManifest {
  constructor (manifest) {
    this.manifest = manifest
  }

  ref (key) {
    if (this.manifest[key]) {
      return key
    }

    throw new Error(`AssetManifest is lacking a reference of "${key}"`)
  }
}

const loadAssetManifest = (options = { tryCount: 5, retryTimeout: 1000 }) => {
  const failsaveLoader = (resolve, reject, count = 0) => {
    console.log(`load asset manifest, try ${count + 1}`)
    if (count > options.tryCount - 1) {
      reject(
        new Error('failed to load CSS Manifest from dist/styles/manifest.json')
      )
    }

    try {
      const manifestPath = path.resolve(
        process.cwd(),
        'dist/styles/manifest.json'
      )
      const cssManifest = require(manifestPath)
      console.log('CSS manifest loaded')
      resolve(new AssetManifest(cssManifest))
    } catch (e) {
      console.log('failed retrieving CSS manifest', e.message)
      setTimeout(
        () => failsaveLoader(resolve, reject, count + 1),
        options.retryTimeout
      )
    }
  }

  return new Promise((resolve, reject) => failsaveLoader(resolve, reject))
}

module.exports = loadAssetManifest
