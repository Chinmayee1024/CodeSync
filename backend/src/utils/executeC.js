const { exec } = require("child_process");
const path = require("path");

const executeC = (filepath) => {
  return new Promise((resolve, reject) => {
    const uniqueName = path.basename(filepath).split(".")[0];
    const wayName = path.join(__dirname, "../fileRunner/c_runner");

    // Compile and then run the executable (Windows-compatible)
    exec(
      `cd ${wayName} && gcc ${uniqueName}.c -o ${uniqueName} && ${uniqueName}.exe`,
      (error, stdout, stderr) => {
        if (error) {
          console.error("chinmayee-C execution error:", error);
          reject(error);
        } else if (stderr) {
          console.error("chinmayee-C stderr:", stderr);
          reject(stderr);
        } else {
          console.log("chinmayee-C stdout:", stdout);
          resolve(stdout);
        }
      }
    );
  });
};

module.exports = {
  executeC,
};
