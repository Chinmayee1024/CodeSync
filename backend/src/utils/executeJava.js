const { exec } = require("child_process");
const path = require("path");



const executeJava = async (filepath) => {
  try {
    const uniqueName = path.basename(filepath).split(".")[0];
    const wayName = path.join(__dirname, "../fileRunner/java_runner");

    // Compile and then run
    const { stdout, stderr } = await new Promise((resolve, reject) => {
      exec(
        `cd ${wayName} && javac ${uniqueName}.java && java ${uniqueName}`,
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve({ stdout, stderr });
          }
        }
      );
    });

    if (stderr) {
      console.error("chinmayee-Java stderr:", stderr);
      throw new Error(stderr);
    }

    console.log("chinmayee-Java stdout:", stdout);
    return stdout;
  } catch (error) {
    console.error("chinmayee-Java execution error:", error);
    throw error;
  }
};

module.exports = {
  executeJava,
};