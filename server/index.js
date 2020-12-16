const restify = require('restify');
const errs = require('restify-errors');
const model = require('./config/database');

const server = restify.createServer({
  name: 'Business listing api'
})

const port = process.env.PORT || 8000;

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
  mapParams: true,
  mapFiles: true,
  keepExtensions: true,
  uploadDir: 'assets',
  multiples: true
}));

// Register Endpoints

server.listen(port, function () {
  console.log('Server running at http://localhost:' +port);
})
