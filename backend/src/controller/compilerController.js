const { generatePy } = require("../utils/generatePy");
const { executePy } = require("../utils/executePy");
const { executeDart } = require("../utils/executeDart");
const { generateDartFile } = require("../utils/generateDart");
const { generateJavaFile } = require("../utils/generateJava");
const { executeJava } = require("../utils/executeJava");
const { generateCFile } = require("../utils/generateC");
const { executeC } = require("../utils/executeC");

const runPython = async (req, res) => {
  const { language = "py", code = "print('hello python')" } = req.body;

  if (!code)
    return res.status(400).json({ success: false, error: "Please Enter Code" });

  try {
    console.log("Running Python code...");
    const filepath = await generatePy(language, code);
    const output = await executePy(filepath);
    return res.json({ filepath, output });
  } catch (err) {
    console.error("Error running Python code:", err);

    // Extract meaningful error message from stderr or fallback
    const match = err.toString().match(/File ".*", line (\d+)([\s\S]*)/);
    const realError = match
      ? `Line ${match[1]}:${match[2].trim()}`
      : err.toString();

    res.status(500).json({ error: `Python Error: ${realError}` });
  }
};



const runDart = async (req, res) => {
  const { language = "dart", code = "void main(){print('hello dart');}" } =
    req.body;

  if (!code)
    return res.status(400).json({ success: false, error: "Please Enter Code" });

  try {
    console.log("Running Dart code...");
    const filepath = await generateDartFile(language, code);
    const output = await executeDart(filepath);
    return res.json({ filepath, output });
  } catch (err) {
    console.error("Error running Dart code:", err);
    const match = err.toString().match(/ Error: ([^\n]+)\n([^\n]+)/);
    const realError = match ? match[0].trim() : "Unknown error occurred";
    res.status(500).json({ error: `Error: ${realError}` });
  }
};

const runJava = async (req, res) => {
  const {
    language = "java",
    code = 'public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } }',
  } = req.body;

  if (!code.trim())
    return res.status(400).json({ success: false, error: "Please Enter Code" });

  try {
    console.log("Running Java code...");
    const { filepath, className } = await generateJavaFile(language, code);
    const output = await executeJava(filepath, className);
    return res.json({ filepath, output });
  } catch (err) {
    console.error("Error running Java code:", err);
    const match = err.toString().match(/Exception in thread "main" ([^\n]+)/);
    const realError = match ? match[0].trim() : "Unknown error occurred";
    res.status(500).json({ error: `Error: ${realError}` });
  }
};

const runC = async (req, res) => {
  const {
    language = "c",
    code = '#include <stdio.h>\nint main() {\n    printf("Hello World");\n    return 0;\n}',
  } = req.body;

  if (!code)
    return res.status(400).json({ success: false, error: "Please Enter Code" });

  try {
    console.log("Running C code...");
    const filepath = await generateCFile(language, code);
    const output = await executeC(filepath);
    return res.json({ filepath, output });
  } catch (err) {
    console.error("Error running C code:", err);
    const match = err.toString().match(/error: (.*)/);
    const realError = match ? match[0].trim() : "Unknown error occurred";
    res.status(500).json({ error: `Error: ${realError}` });
  }
};

module.exports = { runPython, runDart, runJava, runC };
