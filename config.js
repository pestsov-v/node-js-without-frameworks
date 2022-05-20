const config = {
  PORT: 3010,
  listeningServerHandler: () =>
    console.log(`Сервер работает на порту: ${config.PORT}`),
};

module.exports = config;
