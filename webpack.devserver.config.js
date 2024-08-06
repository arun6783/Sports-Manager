import fs from 'fs'
import path from 'path'
import evalSourceMapMiddleware from 'react-dev-utils/evalSourceMapMiddleware.js'
import noopServiceWorkerMiddleware from 'react-dev-utils/noopServiceWorkerMiddleware.js'
import ignoredFiles from 'react-dev-utils/ignoredFiles.js'
import redirectServedPath from 'react-dev-utils/redirectServedPathMiddleware.js'
import getHttpsConfig from './getHttpsConfig.js'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const paths = {
  appSrc: path.resolve(process.cwd(), 'src/client'),
  appPublic: path.resolve(process.cwd(), 'src/client/public'),
  publicUrlOrPath: '/',
  proxySetup: path.resolve(process.cwd(), 'src/utils/setupProxy.js'),
}

const host = process.env.HOST || '0.0.0.0'
const allowedHost = process.env.ALLOWED_HOST || 'localhost'

export default {
  allowedHosts: allowedHost ? [allowedHost] : [],
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
  compress: true,
  static: {
    directory: paths.appPublic,
    publicPath: [paths.publicUrlOrPath],
    watch: {
      ignored: ignoredFiles(paths.appSrc),
    },
  },
  client: {
    webSocketURL: {
      hostname: process.env.WDS_SOCKET_HOST,
      pathname: process.env.WDS_SOCKET_PATH,
      port: process.env.WDS_SOCKET_PORT,
    },
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  devMiddleware: {
    publicPath: paths.publicUrlOrPath.slice(0, -1),
  },
  https: getHttpsConfig(),
  host,
  historyApiFallback: {
    disableDotRule: true,
    index: paths.publicUrlOrPath,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
  onBeforeSetupMiddleware(devServer) {
    devServer.app.use(evalSourceMapMiddleware(devServer))
    if (fs.existsSync(paths.proxySetup)) {
      import(paths.proxySetup).then((setupProxy) =>
        setupProxy.default(devServer.app)
      )
    }
  },
  onAfterSetupMiddleware(devServer) {
    devServer.app.use(redirectServedPath(paths.publicUrlOrPath))
    devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath))
  },
}
