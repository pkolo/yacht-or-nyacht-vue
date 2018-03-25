const express = require('express')
const app = express()
const noBots = require('express-nobots')

app.use(noBots({block: true}))
