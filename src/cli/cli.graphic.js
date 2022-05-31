class CLIGraphic {
  horizontalLine() {
    const width = process.stdout.columns;
    let line = "";
    let i = 0;
    for (i = 0; i < width; i++) {
      line += "-";
    }
    console.log(line);
  }

  verticalSpace = function (lines) {
    lines = typeof lines == "number" && lines > 0 ? lines : 1;
    let i = 0;
    for (i = 0; i < lines; i++) {
      console.log("");
    }
  };

  centered(str) {
    str = typeof str == "string" && str.trim().length > 0 ? str.trim() : "";

    const width = process.stdout.columns;

    const leftPadding = Math.floor((width - str.length) / 2);

    let line = "";
    let i = 0;
    for (i = 0; i < leftPadding; i++) {
      line += " ";
    }
    line += str;
    console.log(line);
  }
}

module.exports = new CLIGraphic();
