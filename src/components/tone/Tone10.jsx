import React, { useEffect, useState, useRef } from "react";
import tone10 from "./../../assets/sounds/10.mp3";
import angklung from "./../../assets/images/angklung.png";

const Tone10 = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCoror, setIsCoror] = useState("red");
  const [isVibrate, setIsVibrate] = useState(false);
  const vibrateRef = useRef(null);

  const vibrate = () => {
    setIsVibrate((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "0") {
        if (!isPlaying) {
          audioRef.current.play();
          setIsPlaying(true);
          setIsCoror("blue");
          vibrateRef.current = setInterval(vibrate, 100);
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "0") {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setIsCoror("red");
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
        className={`h-20 ${isVibrate ? "skew-x-2" : "skew-x-0"}`}
      />

      <button style={{ backgroundColor: isCoror }}>0</button>
      <audio src={tone10} ref={audioRef} loop></audio>
    </div>
  );
};

export default Tone10;
