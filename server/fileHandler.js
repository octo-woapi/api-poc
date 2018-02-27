const fs = require('fs')

function write (path, stuffToWrite, callback) {
  fs.writeFile(path, stuffToWrite, (err) => {
    if (err) callback(err)
  })
}

function read (path) {
  return fs.readFile(path)
}

module.exports = {
  write,
  read
}
