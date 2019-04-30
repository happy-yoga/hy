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

const loadAssetManifest = (
  assetPath,
  options = { tryCount: 5, retryTimeout: 1000 }
) => {
  const failsaveLoader = (resolve, reject, count = 0) => {
    console.log(`load asset manifest, try ${count + 1}`)
    if (count > options.tryCount - 1) {
      reject(new Error(`failed to load Asset Manifest from ${assetPath}`))
    }

    try {
      const manifestPath = path.resolve(process.cwd(), assetPath)
      const assetManifest = require(manifestPath)
      console.log(`"${manifestPath}" loaded`)
      resolve(new AssetManifest(assetManifest))
    } catch (e) {
      console.log('failed retrieving Asset Manifest', e.message)
      setTimeout(
        () => failsaveLoader(resolve, reject, count + 1),
        options.retryTimeout
      )
    }
  }

  return new Promise((resolve, reject) => failsaveLoader(resolve, reject))
}

module.exports = loadAssetManifest
