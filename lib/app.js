require('pug')

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

app.set('view engine', 'pug')

app.use(helmet())
app.use(morgan('combined'))

module.exports = app
