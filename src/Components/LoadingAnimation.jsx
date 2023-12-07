import React from 'react'
import mygif from '../assets/loading.gif'
const LoadingAnimation = () => {
  const newLocal = "loadingScreen";
  return (
      <div id={newLocal}>
        <img src={mygif} alt="Loading" />
        <div id="loadingText">Loading...</div>
    </div>
  );
}

export default LoadingAnimation;