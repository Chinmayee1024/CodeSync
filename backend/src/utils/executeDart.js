const { exec } = require("child_process");
const path = require("path");

const executeDart = (filepath) => {
  return new Promise((resolve, reject) => {
    const uniqueName = path.basename(filepath).split(".")[0];
    const wayName = path.join(__dirname, "../fileRunner/dart_runner");

    // Absolute path to the Dart SDK
    const dartPath = "C:\\tools\\dart-sdk\\bin\\dart"; // Update with the correct Dart SDK path

    console.log("File Location:", wayName);

    exec(
      `cd ${wayName} && ${dartPath} ${uniqueName}.dart`, // Use absolute path to dart executable
      (error, stdout, stderr) => {
        if (error) {
          console.error("chinmayee-Dart execution error:", error);
          reject(error);
        } else if (stderr) {
          console.error("chinmayee-Dart stderr:", stderr);
          reject(stderr);
        } else {
          console.log("chinmayee-Dart stdout:", stdout);
          resolve(stdout);
        }
      }
    );
  });
};

module.exports = {
  executeDart,
};
