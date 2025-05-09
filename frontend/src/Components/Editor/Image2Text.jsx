import React, { useState } from 'react'
import LangList from './LangList'
import Tesseract from 'tesseract.js';
import { toast } from "react-hot-toast"
import copy_icon from '../../assets/copy_icon.gif'

function Image2Text() {

  const [isLoading, setIsLoading] = useState(false);
  const [imagePath, setImagePath] = useState("/mainLogo.png");
  const [text, setText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState('eng'); // if you want language later

  const handleChange = (event) => {
    if (event.target.files.length > 0) {
      toast.success('File Added.');
      setImagePath(URL.createObjectURL(event.target.files[0]));
    }
  }

  const handleClick = () => {
    if (!imagePath) {
      toast.error('Please upload an image first.');
      return;
    }

    toast.loading("Converting into Text...");
    setIsLoading(true);

    Tesseract.recognize(
      imagePath,
      selectedLanguage || 'eng',
      {
        logger: m => console.log(m),
        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?()[]{}:-_/\\'\" ",
        preserve_interword_spaces: 1,
      }
    )
      .then(result => {
        let confidence = result.data.confidence;
        let extractedText = result.data.text.trim();

        // Clean up any extra unwanted characters
        extractedText = extractedText.replace(/[^a-zA-Z0-9\s.,!?(){}\[\]\-_/\\'"]/g, '');

        setText(extractedText);
        console.log("Confidence:", confidence, "Extracted Text:", extractedText);

        toast.remove();
        toast.success("Image Converted Successfully!");
      })
      .catch(err => {
        console.error(err);
        toast.remove();
        if (err.message) {
          toast.error(`Error: ${err.message}`);
        } else {
          toast.error("Something went wrong during conversion.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const copyContent = () => {
    if (text.trim() === '') {
      toast.error("Nothing to Copy");
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success("Copied to Clipboard");
  }

  const clear = () => {
    toast.success("Output Cleared");
    setText('');
  }

  return (
    <>
      <div className="voiceContainer">
        <div className="voiceBody wholeeditorBody">
          <div className="leftLang">
            <LangList leftcolori="white" />
          </div>
          <div className="voicePlayground">
            <mark><h1>Image to Text Converter</h1></mark><br />
            <main className='imageMain'>
              <img src={imagePath} className='Image-Logo' alt="logo" />
              <input className='imagefiletype' type="file" onChange={handleChange} />
              <div className="imagebutton">
                <button className='btn btnbtn' onClick={copyContent}>Copy</button>
                <input
                  type="submit"
                  className='btn imgbtn'
                  onClick={handleClick}
                  value={isLoading ? "Loading..." : "Convert To Text"}
                />
                <button className='btn btnbtn' onClick={clear}>Clear</button>
              </div>

              <div className="image-text-box">
                <textarea
                  name="vtext"
                  id="vtext"
                  placeholder='Your Text Here'
                  value={text}
                  onChange={(e) => { setText(e.target.value) }}
                ></textarea>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Image2Text;
