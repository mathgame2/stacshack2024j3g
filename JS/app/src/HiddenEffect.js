import React, { useState, useEffect } from 'react';
import NotBill from './pics/not_bill.png';
import './HiddenEffect.css'; 
import yourMusicFile from './music/GravityFalls.mp3'; // Import your audio file

const HiddenEffect = ({ onPasswordMatch }) => {
  let flag = [];
  const [showImage, setShowImage] = useState(false);
  const passwordSequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  // Ref for the audio element
  const audioRef = React.createRef();

  const handleKeyPress = (event) => {
    flag.push(event.key);

    if(flag.length !== 0){
        setTimeout(() => {
            flag = []; 
            console.log("reset")
          }, 3000);
    }
   
    if (flag.length === passwordSequence.length) {
      if (flag.every((value, index) => value === passwordSequence[index])) {
        console.log("Password entered correctly");
        setShowImage(true);
        setTimeout(() => setShowImage(false), 3000); // Keep image visible for 5 seconds
        onPasswordMatch(true); 
        audioRef.current.play(); // Play the audio
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

  return (
    <>
      {showImage && <img src={NotBill} alt="Not Bill" className="fade-in-out" />}
      <audio ref={audioRef} src={yourMusicFile} />
    </>
  );
};

export default HiddenEffect;
