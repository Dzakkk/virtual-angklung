import React, { useEffect, useState, useRef } from "react";
import tone7 from "./../../assets/sounds/7.mp3";

const Tone7 = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false)
    const [isCoror, setIsCoror] = useState("red");


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === '7' ) {
                if (!isPlaying) {
                    audioRef.current.play();
                    setIsPlaying(true)
                    setIsCoror("blue")

                };
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === '7' ) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false)
                setIsCoror("red")

            }
        };

        const handleTimeUpdate = () => {
            if (audioRef.current.currentTime >= audioRef.current.duration - 0.1) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        audioRef.current.addEventListener('timeUpdate', handleTimeUpdate);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeUpdate', handleTimeUpdate)
            }
        };
    }, [isPlaying]);

    return (
        <div>
            <button style={{ backgroundColor: isCoror }} >7</button>
            <audio src={tone7} ref={audioRef} loop></audio>
        </div>
    )
}

export default Tone7;