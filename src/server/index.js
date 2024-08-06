import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import dotenv from 'dotenv'
import apiRoutes from './api/index.js'
import webpackConfig from '../../webpack.devserver.config.js' // Adjusted path for development server

dotenv.config()

const app = express()
const PORT = 5000
const isDevelopment = true

// Custom __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())

// Use Webpack middleware for development
if (isDevelopment) {
  const compiler = webpack(webpackConfig)

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.devServer.publicPath,
    })
  )

  app.use(webpackHotMiddleware(compiler))
} else {
  // Serve static files from the 'dist' directory in production
  app.use(express.static(path.join(__dirname, '../../dist')))
}

// API routes
app.use('/api', apiRoutes)

// All other routes should render the main HTML file
app.get('*', (req, res) => {
  const indexPath = isDevelopment
    ? path.resolve(__dirname, '../client/public/index.html')
    : path.resolve(__dirname, '../../dist/index.html')

  res.sendFile(indexPath)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
