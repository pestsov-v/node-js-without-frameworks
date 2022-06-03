import readLine from "readline";
import { inputCommandMatched } from "./cli.utils";

export function cli(): void {
  console.log("\x1b[33m%s\x1b[0m", `Интерфейс командной строки успешно запущен`);

  const _interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  _interface.prompt();
  _interface.on("line", (str: string): void => {
    inputCommandMatched(str);
    _interface.prompt();
  });

  _interface.on("close", (): void => {
    process.exit(0);
  });
}