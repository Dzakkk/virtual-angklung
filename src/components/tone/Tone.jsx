import React, { useEffect, useState, useRef } from "react";
import angklung from "./../../assets/images/angklung.png";

const Tone = ({ keySound, soundSrc, size }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVibrate, setIsVibrate] = useState(false);
  const vibrateRef = useRef(null);

  const vibrate = () => {
    setIsVibrate((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === keySound && !isPlaying) {
        if (!audioRef.current) {
          audioRef.current = new Audio(soundSrc);
          audioRef.current.addEventListener("canplaythrough", () => {
            audioRef.current.play();
            audioRef.current.loop = true;
            setIsPlaying(true);
            vibrateRef.current = setInterval(vibrate, 100);
          });
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === keySound && isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
          clearInterval(vibrateRef.current);
          setIsVibrate(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isPlaying, keySound, soundSrc]);

  return (
    <div>
      <img
        src={angklung}
        alt="angklung"
        className={`${size} ${isVibrate ? "skew-x-2" : "skew-x-0"}`}
      />
      <button
        className={`px-4 py-2 text-sm font-bold text-gray-900 bg-white border border-gray-700 rounded-lg transform ${
          isPlaying ? "shadow-none mt-2" : "shadow-lg border-b-4"
        }`}
      >
        {keySound}
      </button>
    </div>
  );
};

export default Tone;
