const { exec } = require("child_process");
const path = require("path");

const executePy = (filepath) => {
  return new Promise((resolve, reject) => {
    const uniqueName = path.basename(filepath).split(".")[0];
    const wayName = path.join(__dirname, "../fileRunner/python_runner");
    const command = `cd ${wayName} && python ${uniqueName}.py`;

    console.log("Executing Command:", command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        const errorMsg = stderr || error.message;
        console.error("Python Execution Error:", errorMsg);
        return reject(errorMsg);
      }

      console.log("Python script executed successfully. Output:");
      console.log(stdout);
      resolve(stdout);
    });
  });
};

module.exports = {
  executePy,
};
