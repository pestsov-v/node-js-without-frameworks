const env = {};

env.staging = {
  httpPort: 3010,
  httpsPort: 3011,
  envName: "staging",
  hashingSecret: "ThisIsSecret",
};

env.production = {
  httpPort: 5010,
  httpsPort: 5011,
  envName: "production",
  hashingSecret: "ThisIsAlsoSecret",
};

const currentEnv =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

const envToExport =
  typeof env[currentEnv] == "object" ? env[currentEnv] : env.staging;

module.exports = envToExport;
