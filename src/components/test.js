import React, { useState, useEffect } from 'react';

function ScreenSize() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    // Attach event listener to window resize event
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <p>Screen Width: {screenWidth}px</p>
      <p>Screen Height: {screenHeight}px</p>
    </div>
  );
}

export default ScreenSize;
