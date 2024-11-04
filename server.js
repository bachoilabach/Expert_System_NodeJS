const { app } = require("./src/app");
const http = require('http');
const server = http.createServer(app);

const PORT = 3056;

server.listen(PORT, () => {
    console.log(`Expert System start with ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => console.log(`Exit Server Express`));
});