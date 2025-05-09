import React from "react";
import mic from "../../assets/mic.png";
import js from "../../assets/js.png";
import html from "../../assets/html.png";
import css from "../../assets/css.png";
import python from "../../assets/python.png";
import dart from "../../assets/dart.png";
import image from "../../assets/image.png";
import c from "../../assets/c.png";
import java from "../../assets/java.png";
import { NavLink } from "react-router-dom";

function LangList(props) {
  return (
    <>
      <div className="LangContainer">
        <div className="langSection languages">
          <div
            className="languageBorder"
            style={{ backgroundColor: `${props.leftcolorjs}` }}
          >
            <NavLink to="/editor/javascript">
              <img src={js} alt="JLanguage " />
            </NavLink>
            {/* <a href="/editor/javascript"><img src={js} alt="JLanguage " /></a> */}
          </div>
          <div
            className="languageBorder"
            style={{ backgroundColor: `${props.leftcolorhtml}` }}
          >
            <NavLink to="/editor/html">
              <img className={props.html} src={html} alt="Language " />
            </NavLink>
          </div>
          <div
            className="languageBorder"
            style={{ backgroundColor: `${props.leftcolorpy}` }}
          >
            {/* <a href="/editor/python"><img className={props.py} src={python} alt="Language "  /></a> */}
            <NavLink to="/editor/python">
              <img className={props.py} src={python} alt="Language " />
            </NavLink>
          </div>
          <div
            className="languageBorder"
            style={{ backgroundColor: `${props.leftcolorhtml}` }}
          >
            <NavLink to="/editor/css">
              <img className={props.html} src={css} alt="Language " />
            </NavLink>
          </div>
          <div
            className="languageBorder"
            style={{ backgroundColor: `${props.leftcolordart}` }}
          >
            <NavLink to="/editor/dart">
              <img className={props.dart} src={dart} alt="Language " />
            </NavLink>
            {/* <a href="/editor/dart"><img className={props.dart} src={dart} alt="Language "/></a> */}
          </div>
          <div
            className="languageBorder"
            style={{ backgroundColor: `${props.leftcolorjava}` }}
          >
            <NavLink to="/editor/java">
              <img className={props.java} src={java} alt="Language " />
            </NavLink>
            {/* <a href="/editor/dart"><img className={props.dart} src={dart} alt="Language "/></a> */}
          </div>
          <div
            className="languageBorder"
            style={{ backgroundColor: `${props.leftcolorc}` }}
          >
            <NavLink to="/editor/c">
              <img className={props.c} src={c} alt="Language " />
            </NavLink>
            {/* <a href="/editor/dart"><img className={props.dart} src={dart} alt="Language "/></a> */}
          </div>
        </div>
        <div className="FeatureSection languages">
          <div
            className="languageBorder"
            style={{ backgroundColor: `${props.leftcolorv}` }}
          >
            <NavLink to="/editor/voice2text">
              <img src={image} alt="feature " />
            </NavLink>
          </div>
          <div
            className="languageBorder"
            style={{ backgroundColor: `${props.leftcolori}` }}
          >
            <NavLink to="/editor/image2text">
              <img src={mic} alt="feaute" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default LangList;
