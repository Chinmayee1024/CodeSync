const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "../fileRunner/c_runner");
console.log("C files are storing at:", dirCodes);

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateCFile = async (format, content) => {
  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);

  await fs.writeFileSync(filepath, content);
  return filepath;
};

module.exports = {
  generateCFile,
};
