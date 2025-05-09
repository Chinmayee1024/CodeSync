const fs = require("fs");
const path = require("path");

const dirCodes = path.join(__dirname, "../fileRunner/java_runner");
console.log("Java files are storing at:", dirCodes);

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

// 👉 function to extract class name
function extractClassName(content) {
  const match = content.match(/public\s+class\s+(\w+)/);
  if (match && match[1]) {
    return match[1];
  }
  throw new Error("No public class found in Java code!");
}

const generateJavaFile = async (format, content) => {
  // 🛠 Extract class name from content
  const className = extractClassName(content);

  const filename = `${className}.${format}`; // ✅ now based on class name
  const filepath = path.join(dirCodes, filename);

  await fs.writeFileSync(filepath, content);

  return { filepath, filename, className }; // ✅ return more info (for execution)
};

module.exports = {
  generateJavaFile,
};
