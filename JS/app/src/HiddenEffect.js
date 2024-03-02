import React, { useState, useEffect, useRef } from 'react';
import NotBill from './pics/not_bill_dancing.gif';
import './HiddenEffect.css'; 
import yourMusicFile from './music/GravityFalls.mp3'; 

const HiddenEffect = ({ onPasswordMatch }) => {
  let flag = [];
  const [showImage, setShowImage] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);  // State to control audio playback
  const passwordSequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  const audioRef = useRef(null); // Changed to useRef

  const handleKeyPress = (event) => {
    flag.push(event.key);

    if (flag.length !== 0) {
      setTimeout(() => {
        flag = [];
        console.log("reset");
      }, 3000);
    }

    if (flag.length === passwordSequence.length) {
      if (flag.every((value, index) => value === passwordSequence[index])) {
        console.log("Password entered correctly");
        setShowImage(true);
        setPlayAudio(true); // Set the state to play audio
        setTimeout(() => {
          setShowImage(false);
          setPlayAudio(false); // Stop playing after a delay
        }, 3000);
        onPasswordMatch(true);
      } else {
        console.log("Incorrect password");
        onPasswordMatch(false);
        flag = [];
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (playAudio && audioRef.current) {
      audioRef.current.play();
    }
  }, [playAudio]); // Play audio when playAudio state changes

  return (
    <>
      {showImage && <img src={NotBill} alt="Not Bill" className="fade-in-out" />}
      {playAudio && <audio ref={audioRef} src={yourMusicFile} />}
    </>
  );
};

export default HiddenEffect;
