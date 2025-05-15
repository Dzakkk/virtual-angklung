import React, { useRef, useEffect } from "react";

const noteKeyMap = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "10",
};

const AngklungApp = () => {
  const audioRefs = useRef({});

  const playLoop = (note) => {
    if (!audioRefs.current[note]) {
      const audio = new Audio(`sounds/${note}.mp3`);
      audio.loop = true;
      audio.play();
      audioRefs.current[note] = audio;
    }
  };

  const stopLoop = (note) => {
    const audio = audioRefs.current[note];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      delete audioRefs.current[note];
    }
  };

  const handleKeyDown = (e) => {
    const note = noteKeyMap[e.key];
    if (note) {
      playLoop(note);
    }
  };

  const handleKeyUp = (e) => {
    const note = noteKeyMap[e.key];
    if (note) {
      stopLoop(note);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="flex flex-row gap-4 p-4 overflow-x-auto">
      {Object.entries(noteKeyMap).map(([key, note]) => (
        <button
          key={note}
          onMouseDown={() => playLoop(note)}
          onMouseUp={() => stopLoop(note)}
          onMouseLeave={() => stopLoop(note)}
          onTouchStart={() => playLoop(note)}
          onTouchEnd={() => stopLoop(note)}
          className="bg-green-300 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl shadow-md"
        >
          {key} - {note}
        </button>
      ))}
    </div>

  );
}

export default AngklungApp;
