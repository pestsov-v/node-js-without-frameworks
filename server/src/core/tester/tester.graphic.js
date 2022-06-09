class TesterGraphic {
  emptyLine() {
    console.log("");
  }

  headerLine(header) {
    console.log(`--------------------${header}--------------------`);
  }

  resultLine(message, result) {
    console.log(message, result);
  }
}

module.exports = new TesterGraphic();
