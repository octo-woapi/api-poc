function main (req, services) {
  if (req.method === 'PUT') {
    services.updateOrCreate(req.body)
  }
}

module.exports = {
  main
}