const Server = require('../../src/server/Server');

Server.createServer(3988)
    .then(server => server.run());
