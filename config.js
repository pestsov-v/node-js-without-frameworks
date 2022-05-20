const env = {};

env.staging = {
  PORT: 3010,
  envName: "staging",
};

env.production = {
  PORT: 5010,
  envName: "production",
};

const currentEnv =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

const envToExport =
  typeof env[currentEnv] == "object" ? env[currentEnv] : env.staging;

module.exports = envToExport;
