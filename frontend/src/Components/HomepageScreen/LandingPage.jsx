import React from "react";
import blob from "../../assets/blobanimation.svg";

function LandingPage() {
  return (
    <div className="landingContainer container">
      <img src={blob} alt="" className="blob_a blob1" />
      <img src={blob} alt="" className="blob_a blob2" />
      <div className="landingInfo">
        <h1>CodeSync</h1>
        <p>
          <p>
            <em>Think smart. Speak clear. Code strong. Repeat endlessly.</em>
          </p>
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
