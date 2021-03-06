require('dotenv').config()

const express = require('express')
const app = require('./lib/app.js')
const { landingPage } = require('./lib/controller.js')
const assetLoader = require('./lib/asset-manifest.js')
const contentfulRenderer = require('./lib/contentful-renderer.js')
const contentful = require('./lib/contentful-client.js')
const env = require('./lib/env-helper.js')

app.use('/styles', express.static('dist/styles', { ...immutableCaching() }))
app.use('/scripts', express.static('dist/scripts', { ...immutableCaching() }))

app.use(
  '/images',
  express.static('dist/images', {
    ...immutableCaching()
  })
)
app.use('/', express.static('favicon'))

const prepareApp = async () => {
  const cssManifest = await assetLoader('dist/styles/manifest.json')
  const scriptManifest = await assetLoader('dist/scripts/manifest.json')

  const viewOptions = {
    styles: cssManifest,
    scripts: scriptManifest,
    pretty: true
  }

  app.get('/', landingPage({ viewOptions, contentfulRenderer, contentful }))

  return app
}

prepareApp()
  .then(app => {
    const port = process.env.PORT

    if (!port) {
      throw new Error('PORT required')
    }

    app.listen(port, () => {
      console.log(`app listening to PORT: ${port}`)
    })
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })

function immutableCaching () {
  return {
    immutable: env.isProduction(),
    maxAge: env.isProduction() ? '365d' : 0,
    etag: env.isProduction(),
    lastModified: env.isProduction()
  }
}
