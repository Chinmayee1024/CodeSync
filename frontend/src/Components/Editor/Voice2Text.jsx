import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import useClipboard from "react-use-clipboard";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import LangList from "./LangList";
import { toast } from "react-hot-toast";

function Voice2Text() {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy);

  const phraseToSymbolMap = {
    // Punctuation
    "semicolon": ";",
    "semi colon": ";",
    "comma": ",",
    "coma": ",",
    "colon": ":",
    "koh-lon": ":",
  
    // Dot/Period
    "dot": ".",
    "full stop": ".",
    "period": ".",
  
    // Brackets
    "open parentheses": "(",
    "close parentheses": ")",
    "open parenthesis": "(",
    "close parenthesis": ")",
    "open round bracket": "(",
    "close round bracket": ")",
    "open curly bracket": "{",
    "close curly bracket": "}",
    "open curly braces": "{",
    "close curly braces": "}",
    "open square bracket": "[",
    "close square bracket": "]",
    "open square braces": "[",
    "close square braces": "]",
    "open angle bracket": "<",
    "close angle bracket": ">",
  
    // Quotes
    "open single quotes": "'",
    "close single quotes": "'",
    "open single code": "'",
    "close single code": "'",
    "open single quote": "'",
    "close single quote": "'",
    "apostrophe": "'",
  
    "open double quotes": '"',
    "close double quotes": '"',
    "open double code": '"',
    "close double code": '"',
    "open double quote": '"',
    "close double quote": '"',
  
    // Mathematical & logical symbols
    "equals": "=",
    "equal": "=",
    "equal to": "=",
    "not equal": "!=",
    "plus": "+",
    "add": "+",
    "addition": "+",
    "minus": "-",
    "subtract": "-",
    "subtraction": "-",
    "star": "*",
    "asterisk": "*",
    "multiply": "*",
    "multiplication": "*",
    "divide": "/",
    "division": "/",
    "mod": "%",
    "modulus": "%",
  
    // Logical/comparison
    "greater than": ">",
    "more than": ">",
    "less than": "<",
    "lesser than": "<",
    "greater than or equal to": ">=",
    "less than or equal to": "<=",
  
    // Bitwise and other
    "pipe": "|",
    "vertical bar": "|",
    "or symbol": "|",
    "and symbol": "&",
    "ampersand": "&",
    "tilde": "~",
    "caret": "^",
    "caret symbol": "^",
    "exclamation": "!",
    "not": "!",
  
    // Slashes
    "forward slash": "/",
    "slash": "/",
    "back slash": "\\",
    "backslash": "\\",
  
    // Special characters
    "hash": "#",
    "hashtag": "#",
    "number sign": "#",
    "percent": "%",
    "percentage": "%",
    "at the rate": "@",
    "at symbol": "@",
    "underscore": "_",
    "under score": "_",
    "dash": "-",
    "hyphen": "-",
    "dot dot": "..",
    "double dot": "..",
    "triple dot": "...",
    "ellipsis": "...",
    "question mark": "?",
    "colon colon": "::",
  
    // Currency
    "dollar": "$",
    "dollar sign": "$",
    "bucks": "$",
    "rupee": "₹",
    "rupees": "₹",
    "inr": "₹",
    "indian rupee": "₹",
    "euro": "€",
    "yen": "¥",
    "pound": "£",
  
    // Miscellaneous
    "space": " ",
    "new line": "\n",
    "tab": "\t",
    "backtick": "`",
    "grave accent": "`"
  };
  
  

  const startListening = () => {
    toast.success("Start Speaking");
    toast.loading("Listening...", { duration: 1000 });
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const processTranscript = (transcript) => {
    let processed = transcript.toLowerCase();

    for (const [phrase, symbol] of Object.entries(phraseToSymbolMap)) {
      const regex = new RegExp(`\\b${phrase}\\b`, "gi");
      processed = processed.replace(regex, symbol);
    }

    processed = processed.replace(/\s+/g, " ").trim(); // Remove extra whitespace
    setTextToCopy(processed);
  };

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    processTranscript(transcript);
  }, [transcript]);

  const clearAll = () => {
    setTextToCopy("");
    resetTranscript();
    toast.success("Text Cleared");
  };

  const handleCopy = () => {
    if (textToCopy.trim() === "") {
      toast.error("Nothing to copy!");
      return;
    }
    setCopied();
    toast.success("Text Copied");
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="voiceContainer">
      <div className="voiceBody wholeeditorBody">
        <div className="leftLang">
          <LangList leftcolorv="white" />
        </div>
        <div className="voicePlayground">
          <h1 className="title">Voice to Text Converter</h1>
          <div className="voiceTextContainer">
            <div
              className="voice2TextOutput"
              onClick={() => setTextToCopy(textToCopy)}
            >
              <mark>
                <h3 className="voiceresultclass">{textToCopy}</h3>
              </mark>
            </div>
            <div className="btngroup">
              <button onClick={startListening}>Start</button>
              <button onClick={SpeechRecognition.stopListening}>Stop</button>
              <button onClick={handleCopy}>
                {isCopied ? "Copied" : "Copy"}
              </button>
              <button onClick={clearAll}>Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voice2Text;
