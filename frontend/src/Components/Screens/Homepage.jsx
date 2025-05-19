import React from "react";
import LandingPage from "../HomepageScreen/LandingPage";
import CodingPage from "../HomepageScreen/CodingPage";
import ImageCod from "../../assets/JavaScript frameworks-rafiki.svg";
import HtmlCod from "../../assets/Website Creator-amico.svg";
import Pycod from "../../assets/Man reading-pana.svg";
import SpeechCod from "../../assets/Speech to text-bro.svg";
import CodJava from "../../assets/Coding-bro.svg";
import ImagCod from "../../assets/Writing on the wall-rafiki.svg";
import Feedback from "../HomepageScreen/Feedback";
import Footer from "../HomepageScreen/Footer";

function Homepage() {
  const width2 = window.outerWidth;

  return (
    <>
      <div className="smallScreen">
        <mark>
          The Screen is Visible with width more than 250px <br />
          <br />
          <hr />
          <br />
          Screen Size: {width2}px
        </mark>
      </div>

      <div className="container">
        <LandingPage />

        <CodingPage
          id="python"
          title="Python Compiler"
          con="Run Python"
          path="/editor/python"
          info={
            <>
              Leash out All your <mark> Logic and Understanding</mark> with the
              Easiest Programming Language <mark>Python</mark> in this Super
              Easy Web IDE
            </>
          }
          image={Pycod}
        />

        <CodingPage
          id="javascript"
          title="JavaScript Compiler"
          con="Run JavaScript"
          path="/editor/javaScript"
          info={
            <>
              All The <mark>Logic</mark> That you need to Learn and Practice{" "}
              <mark> JavaScript </mark> will be Accomplished by this{" "}
              <mark> Js Text Editor </mark>.
            </>
          }
          image={ImageCod}
        />

        <CodingPage
          id="java"
          title="Java Compiler"
          con="Run Java"
          path="/editor/java"
          info={
            <>
              Leash out All your <mark> Logic and Understanding</mark> with the
              Programming Language <mark>Java</mark> in this Web IDE
            </>
          }
          image={Pycod}
        />

        <CodingPage
          id="dart"
          title="Dart Compiler"
          path="/editor/dart"
          con="Run Dart"
          info={
            <>
              <mark>Dart</mark> is a Programming Language{" "}
              <mark>Developed by Google</mark> and it is used with{" "}
              <mark>Flutter</mark> to Create Mobile and Web Applications.
            </>
          }
          image={CodJava}
        />

        <CodingPage
          id="c"
          title="C Compiler"
          con="Run C"
          path="/editor/c"
          info={
            <>
              Practice C Programming with this lightweight web-based{" "}
              <mark>C Compiler</mark>.
            </>
          }
          image={Pycod}
        />

        <CodingPage
          id="web"
          title="Real-Time Website Editor"
          path="/editor/html"
          con="Try Web Editor"
          info={
            <>
              Bored Writing HTML codes in Editor then again and again refreshing
              Browser for Output? <mark>Try</mark> our{" "}
              <mark>Real Time Browser</mark>.
            </>
          }
          image={HtmlCod}
        />

        <CodingPage
          id="image2text"
          title="Image To Text"
          path="/editor/image2text"
          image={ImagCod}
          con="Get Started"
          info={
            <>
              Turn Your <mark>Image into Reality</mark> with this amazing
              Feature of <mark>Image to Text</mark> Tool.
            </>
          }
        />

        <CodingPage
          id="voice2text"
          title="Voice To Text"
          path="/editor/voice2text"
          image={SpeechCod}
          info={
            <>
              <mark>"Words Speak more than Actions"</mark> — enable that with
              our <mark>Voice to Text</mark> feature.
            </>
          }
          con="Get Started"
        />

        <Feedback />
        <Footer />
      </div>
    </>
  );
}

export default Homepage;
