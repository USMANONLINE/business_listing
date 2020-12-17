const restify = require('restify');
const errs = require('restify-errors');
const model = require('./config/database');
const corsMiddleware = require('restify-cors-middleware')

const server = restify.createServer({
  name: 'Business listing api'
})

const port = process.env.PORT || 8000;

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['Authorization'],
});

server.pre(cors.preflight);
server.use(cors.actual);

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

server.get('/assets/*',
  restify.plugins.serveStaticFiles('./assets/')
);

// Register Endpoints
require('./api/image')(server, errs, model)
require('./api/listing')(server, errs, model)
require('./api/category')(server, errs, model)

server.listen(port, function () {
  console.log('Server running at http://localhost:' +port);
})
