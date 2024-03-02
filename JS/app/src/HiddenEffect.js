import React, { useEffect } from 'react';

const HiddenEffect = () => {
  let flag = [];
  const passwordSequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  const handleKeyPress = (event) => {
    // Add the pressed key to the flag array
    flag.push(event.key);

    // Check if the flag array matches the password sequence
    if(flag.leng != 0){
        setTimeout(() => {
            flag = []; // Reset the flag array
            console.log("reset")
          }, 3000);
    }
   
    if (flag.length === passwordSequence.length) {
      if (flag.every((value, index) => value === passwordSequence[index])) {
        console.log("Password entered correctly");
      } else {
        console.log("Incorrect password");
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
  return null; 
};
export default HiddenEffect;
