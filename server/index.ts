import server from "./src/server";
const worker = require("./src/modules/worker/worker.module");
import { cli } from "./src/modules/cli/cli.module";

export default function app(callback) {
  server();
  worker();

  setTimeout(() => {
    cli();
    callback;
  }, 50);
}

if (require.main === module) {
  app(function () {});
}