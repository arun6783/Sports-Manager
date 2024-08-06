import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export default function () {
  const useHttps = process.env.HTTPS === 'true'
  const certFile = process.env.SSL_CRT_FILE
  const keyFile = process.env.SSL_KEY_FILE

  if (useHttps && certFile && keyFile) {
    return {
      cert: fs.readFileSync(path.resolve(certFile)),
      key: fs.readFileSync(path.resolve(keyFile)),
    }
  } else if (useHttps) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    })
    return {
      cert: publicKey,
      key: privateKey,
    }
  }
  return useHttps
}
