import React from "react";

import "./LoadingIndicator.css";

function LoadingIndicator() {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default LoadingIndicator;
