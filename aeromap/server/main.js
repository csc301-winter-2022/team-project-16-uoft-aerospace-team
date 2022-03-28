const Server = require("./src/server/Server");

const port = process.env.PORT || 3001;
const server = Server.createServer(port)
    .then(server => server.run());