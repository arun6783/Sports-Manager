const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config.js')
const apiRoutes = require('../api/routes') // Import the API routes

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.SERVER_PORT || 5000

// Integrate Webpack middleware with Express
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig)
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  )
  app.use(webpackHotMiddleware(compiler))
} else {
  // Serve static files from the 'dist' directory in production mode
  app.use(express.static(path.join(__dirname, '../dist')))
}

// Use the API routes
app.use('/api', apiRoutes) // Route all /api requests to the apiRoutes

// Serve index.html for all routes to support client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
