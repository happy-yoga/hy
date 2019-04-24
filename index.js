require('dotenv').config()

const app = require('./lib/app.js')
const { landingPage } = require('./lib/controller.js')

app.get('/', landingPage)

const port = process.env.PORT

if (!port) {
  throw new Error('PORT required')
}

app.listen(port, () => {
  console.log(`app listening to PORT: ${port}`)
})
