import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import videoexample from "./video/1.mp4";
import image from "./image/1.png";
import Confirm from "./confirm";

function App() {
  const videoRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControl, setShowControl] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [imagePosition, setImagePosition] = useState({
    top: "50%",
    left: "50%",
  });
  const [totalClick, setTotalClick] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const positions = [
    { top: "15%", left: "15%" },
    { top: "15%", left: "85%" },
    { top: "85%", left: "15%" },
    { top: "85%", left: "15%" },
    { top: "10%", left: "10%" },
    { top: "10%", left: "80%" },
    { top: "80%", left: "10%" },
    { top: "80%", left: "10%" },
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (isPlaying && videoRef.current) {
  //       videoRef.current.pause();
  //       setShowImage(true);

  //       setImagePosition(
  //         positions[Math.floor(Math.random() * positions.length)]
  //       );

  //       setTimeout(() => {
  //         setShowImage(false);
  //         videoRef.current.play();
  //       });
  //     }
  //   }, 10000);

  //   return () => clearInterval(interval);
  // });
  useEffect(() => {
    let timeout;

    if (isPlaying) {
      timeout = setTimeout(() => {
        setImagePosition(
          positions[Math.floor(Math.random() * positions.length)]
        );
        setShowImage(true);
        videoRef.current.pause();
      }, 10000);
    }

    return () => {
      clearTimeout(timeout);
    };
  });

  const handlePlay = () => {
    let totalClick = Math.floor(videoRef.current.duration / 10);
    setTotalClick(totalClick);
    setIsPlaying(true);
    setShowControl(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleImageClick = () => {
    setShowImage(false);
    videoRef.current.play();
    setClickCount((count) => count + 1);
  };

  const handleEnd = () => {
    setShowConfirm(true);
  };

  return (
    <div>
      <div className="video-container">
        <video
          ref={videoRef}
          className="fullscreen-video"
          controls={showControl}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnd}
        >
          <source src={videoexample} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {showImage && (
          <button
            className="overlay-image"
            style={{
              position: "absolute",
              top: imagePosition.top,
              left: imagePosition.left,
            }}
            onClick={handleImageClick}
          >
            Click here to get token
          </button>
        )}

        {showConfirm && (
          <Confirm totalClick={totalClick} clickCount={clickCount} />
        )}
      </div>
    </div>
  );
}

export default App;
