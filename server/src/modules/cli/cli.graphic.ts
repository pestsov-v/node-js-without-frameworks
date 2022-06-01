import CLIValidator from "./cli.validator";

export default class CLIGraphic {
  static horizontalLine(): void {
    const width = process.stdout.columns;
    let line = "";
    for (let i = 0; i < width; i++) {
      line += "-";
    }
    console.log(line);
  }

  static verticalSpace = function (lines: number): void {
    lines = CLIValidator.linesValidate(lines);
    for (let i = 0; i < lines; i++) {
      console.log("");
    }
  };

  static centered(str: string): void {
    str = CLIValidator.strValidate(str);
    const width = process.stdout.columns;
    const leftPadding = Math.floor((width - str.length) / 2);
    let line = "";

    for (let i = 0; i < leftPadding; i++) {
      line += " ";
    }

    line += str;
    console.log(line);
  }
}