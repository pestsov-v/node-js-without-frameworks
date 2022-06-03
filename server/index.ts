import server from "./src/server";
import worker from "./src/modules/worker/worker.module";
import {cli} from "./src/modules/cli/cli.module";

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