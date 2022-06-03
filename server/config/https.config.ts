import fs from "fs";
import path from "path";

export const options = {
  key: fs.readFileSync(path.join(__dirname, "/../src/core/https/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "/../src/core/https/cert.pem")),
};
