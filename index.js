const server = require('./server.js')

server.listen(3002, () => {
  console.log('Server listening on port 3002')
})
/*  const options =
        {
            host: 'localhost',
            port: 3002,
            path: '/'
        }
    const req = http.get(options, function(res)
    {
        console.log("Got response: " + res.statusCode);
        res.on('data', function(chunk)
        {
            page = page + chunk;
        });
        server.listen('/products', () => {
    console.log('test')
  }) */
