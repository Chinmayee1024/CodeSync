import React, { useState } from "react";
import LangList from "./LangList";
import copy_icon from "../../assets/copy_icon.gif";
import download_icon from "../../assets/download_logo.png";
import { toast } from "react-hot-toast";

function Java() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    toast.loading("Please Wait while File is Executing");
    const payload = {
      language: "java",
      code,
    };

    try {
      const response = await fetch("http://localhost:5000/runjava", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        toast.remove();
        setOutput(data.output);
        toast.success("Executed Successfully.");
      } else {
        setOutput(data.error);
        toast.remove();
        toast.error("An error occurred.");
        console.error("Error in execution:", data.error);
      }
    } catch (err) {
      toast.remove();
      setOutput("Error in communication with the server");
      toast.error("Please Enter Valid Java Code");
      console.error(`Error in java.jsx. The error: ${err}`);
    }
  };

  const clear = () => {
    toast.success("Output Cleared");
    const box = document.querySelector("#consoleOutput p");
    box.innerText = "";
  };

  const copyContent = () => {
    toast.success("Copied");
    navigator.clipboard.writeText(code);
  };

  const codeToFile = () => {
    toast.success("File is Downloading...");
    const text = document.querySelector("#java").value;

    const blob = new Blob([text], { type: "text/java" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "CodeSync-java.java";
    link.click();
  };

  return (
    <>
      <div className="voiceContainer">
        <div className="voiceBody wholeeditorBody">
          <div className="leftLang">
            <LangList leftcolorjava="white" />
          </div>
          <div className="PlaygroundMain">
            <div className="runHeaderJS">
              <div className="jsleftheaderfile jsfile">
                <mark>
                  <h2>Main.java</h2>
                </mark>
                <div className="runbtn">
                  <button className="vbtn">
                    <img
                      className="voicebtn"
                      onClick={copyContent}
                      src={copy_icon}
                      alt="copy"
                    />
                  </button>
                  <button className="vbtn">
                    <img
                      className="voicebtn"
                      onClick={codeToFile}
                      src={download_icon}
                      alt="download"
                    />
                  </button>
                  <button className="btn" onClick={handleSubmit}>
                    RUN
                  </button>
                </div>
              </div>
              <div className="jsrightheaderfile jsfile">
                <mark>
                  <p>OUTPUT</p>
                </mark>
                <button className="clear" onClick={clear}>
                  Clear
                </button>
              </div>
            </div>
            <div className="jsplayground playground">
              <div className="leftplayground snippet">
                <textarea
                  className="dartpython"
                  name="java"
                  id="java"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder='public class Main{
                   public static void main(String[] args){
                   System.out.println("Welcome To CodeSync !"); 
                   } 
                   }'
                ></textarea>
              </div>
              <h1 className="invisible">
                <mark>Output</mark>
              </h1>
              <div className="rightplayground snippet" id="consoleOutput">
                <p>{output}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Java;
