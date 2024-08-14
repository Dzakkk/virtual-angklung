import React, { useEffect, useState, useRef } from "react";
import tone1 from "./../../assets/sounds/1.mp3";
import angklung from "./../../assets/images/angklung.png";

const Tone1 = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVibrate, setIsVibrate] = useState(false);
  const vibrateRef = useRef(null);

  const vibrate = () => {
    setIsVibrate((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "1") {
        if (!isPlaying) {
          audioRef.current.play();
          setIsPlaying(true);
          vibrateRef.current = setInterval(vibrate, 100);
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "1") {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        clearInterval(vibrateRef.current);
        setIsVibrate(false);
      }
    };

    const handleTimeUpdate = () => {
      if (audioRef.current.currentTime >= audioRef.current.duration - 0.1) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    audioRef.current.addEventListener("timeUpdate", handleTimeUpdate);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeUpdate", handleTimeUpdate);
      }
    };
  }, [isPlaying]);

  return (
    <div>
      <img
        src={angklung}
        alt="angklung1"
        className={`h-80 ${isVibrate ? "skew-x-2" : "skew-x-0"}`}
      />
      <button className={`px-4 py-2 text-sm font-bold text-gray-900 bg-white border border-gray-700 rounded-lg transform ${isPlaying ? "shadow-none mt-2" : "shadow-lg border-b-4"}`}>1</button>
      <audio src={tone1} ref={audioRef} loop></audio>
    </div> 
  );
};

export default Tone1;
