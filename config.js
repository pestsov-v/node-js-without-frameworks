const config = {
  PORT: 3010,
  listeningServerHandler: () =>
    console.log(`The server is listening on port ${config.PORT} now`),
};

module.exports = config;
