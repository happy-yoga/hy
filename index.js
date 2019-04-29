require('dotenv').config()

const express = require('express')
const app = require('./lib/app.js')
const { landingPage } = require('./lib/controller.js')

app.use('/styles', express.static('dist/styles'))
app.use('/images', express.static('dist/images'))
app.use('/', express.static('favicon'))

const prepareApp = async () => {
  const assetManifest = await require('./lib/asset-manifest.js')()

  const viewOptions = { assetManifest }

  app.get('/', landingPage({ viewOptions }))

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
