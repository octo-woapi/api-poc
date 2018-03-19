function addController (req, get, validator, tools, add) {
  getData(req, (err, data) => {
    if (err) throw err
    let inputs = tools.getParams(data.toString('utf8'))
    add(inputs, validator)
  })
}

module.exports = addController

function getData (req, callback) {
  let data = ''
  req.on('error', (err) => {
    callback(err)
  })
  req.on('data', (chunk) => {
    data += chunk
  })
  req.on('end', () => {
    callback(null, data)
  })
}
