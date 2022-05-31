const CLIValidator = require("./cli.validator");

class CLIGraphic {
  horizontalLine() {
    const width = process.stdout.columns;
    let line = "";
    for (let i = 0; i < width; i++) {
      line += "-";
    }
    console.log(line);
  }

  verticalSpace = function (lines) {
    lines = CLIValidator.linesValidate(lines);
    for (let i = 0; i < lines; i++) {
      console.log("");
    }
  };

  centered(str) {
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

module.exports = new CLIGraphic();
