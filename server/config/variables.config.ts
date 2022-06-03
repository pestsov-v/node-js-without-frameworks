const env = {};

env.staging = {
  httpPort: 3010,
  httpsPort: 3011,
  envName: "staging",
  hashingSecret: "ThisIsSecret",
  maxChecks: 5,
  twilio: {
    accountSid: "AC699ca45c24a60461b3343bb63b9c2fdb",
    authToken: "014ebf366319b9fe9b36e6a16c62d5e0",
    fromPhone: "+380951699263",
  },
  templateGlobals: {
    appName: "UptimeChecker",
    companyName: "S-Prof",
    yearCreated: "2011",
    baseUrl: "http://localhost:3010/",
  },
};

env.testing = {
  httpPort: 4010,
  httpsPort: 4011,
  envName: "staging",
  hashingSecret: "ThisIsSecret",
  maxChecks: 5,
  twilio: {
    accountSid: "AC699ca45c24a60461b3343bb63b9c2fdb",
    authToken: "014ebf366319b9fe9b36e6a16c62d5e0",
    fromPhone: "+380951699263",
  },
  templateGlobals: {
    appName: "UptimeChecker",
    companyName: "S-Prof",
    yearCreated: "2011",
    baseUrl: "http://localhost:3010/",
  },
};

env.production = {
  httpPort: 5010,
  httpsPort: 5011,
  envName: "production",
  hashingSecret: "ThisIsAlsoSecret",
  maxChecks: 5,
  twilio: {
    accountSid: "ACb32d411ad7fe886aac54c665d25e5c5d",
    authToken: "9455e3eb3109edc12e3d8c92768f7a67",
    fromPhone: "+380951699263",
  },
  templateGlobals: {
    appName: "UptimeChecker",
    companyName: "S-Prof",
    yearCreated: "2011",
    baseUrl: "http://localhost:3010/",
  },
};

const currentEnv =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

const config =
  typeof env[currentEnv] == "object" ? env[currentEnv] : env.staging;

export default config;
