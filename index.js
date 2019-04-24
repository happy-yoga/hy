require('dotenv').config()

const app = require('./lib/app.js')

app.get('/', (req, res) => {
  res.render('index')
})

const port = process.env.PORT

if (!port) {
  throw new Error('PORT required')
}

app.listen(port, () => {
  console.log(`app listening to PORT: ${port}`)
})
