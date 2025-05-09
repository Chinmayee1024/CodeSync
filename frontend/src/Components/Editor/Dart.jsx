import React, { useState } from 'react';
import LangList from './LangList';
import { toast } from 'react-hot-toast';
import copy_icon from '../../assets/copy_icon.gif';
import download_icon from '../../assets/download_logo.png';

function Dart() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    toast.loading('Please Wait while File is executing');
    const payload = {
      language: "dart",
      code,
    };

    try {
      const response = await fetch("http://localhost:5000/rundart", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        toast.remove();
        setOutput(data.output);
        toast.success("Executed Successfully");
      } else {
        setOutput(data.error);
        toast.remove();
        toast.error("An Error Occurred");
      }

    } catch (err) {
      toast.remove();
      toast.error('Error in communication with the server. Please check if Flutter SDK is installed.');
      setOutput("Error in communication with the server");
      console.log(`Error in Dart.js. The error: ${err}`);
    }
  };

  const clear = () => {
    toast.success('Output Cleared');
    const box = document.querySelector(".rightplayground p");
    box.innerHTML = "";
  };

  const copyContent = () => {
    toast.success('Copied');
    navigator.clipboard.writeText(code);
  };

  const codeToFile = () => {
    const text = document.querySelector('#dart').value;
    const blob = new Blob([text], { type: "text/dart" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "CodeSync-dart.dart";
    toast.success('File is Downloading...');
    link.click();
  };

  return (
    <>
      <div className="voiceContainer">
        <div className="voiceBody wholeeditorBody">
          <div className="leftLang">
            <LangList leftcolordart="white" />
          </div>
          <div className="PlaygroundMain">
            <div className='runHeaderJS'>
              <div className='jsleftheaderfile jsfile'>
                <mark><h2>index.dart</h2></mark>
                <div className='runbtn'>
                  <button className='vbtn'>
                    <img className='voicebtn' onClick={copyContent} src={copy_icon} alt='voice' />
                  </button>
                  <button className='vbtn'>
                    <img className='voicebtn' onClick={codeToFile} src={download_icon} alt='voice' />
                  </button>
                  <button className='btn' onClick={handleSubmit}>RUN</button>
                </div>
              </div>
              <div className='jsrightheaderfile jsfile'>
                <mark><p>OUTPUT</p></mark>
                <button className='clear' onClick={clear}>Clear</button>
              </div>
            </div>
            <div className='jsplayground playground'>
              <div className='leftplayground snippet'>
                <textarea
                  className='dartpython'
                  name="dart"
                  id="dart"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); }}
                  placeholder='void main(){print("Hello codoPlayers");}'>
                </textarea>
              </div>
              <h1 className="invisible">
                <mark>Output</mark>
              </h1>
              <div className='rightplayground snippet'>
                <p>{output}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dart;
