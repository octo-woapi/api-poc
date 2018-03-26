function getData (req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('error', (err) => {
      reject(err)
    })
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      resolve(data)
    })
  })
}

module.exports = getData
