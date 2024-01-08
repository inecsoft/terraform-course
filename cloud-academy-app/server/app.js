import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index'
import api from './routes/api'

const app = express()

// Serve public directory as static assets
app.use(express.static('public'))

// Set Embedded JavaScript views
app.set('views', 'views')
app.set('view engine', 'ejs')

// Parse request bodies as text
app.use(bodyParser.text({
  type: '*/*'
}))

app.use('/', routes)
app.use('/api', api)

// Catch not found paths
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .render('error', {
      message: err.message
    })
})

export default app
