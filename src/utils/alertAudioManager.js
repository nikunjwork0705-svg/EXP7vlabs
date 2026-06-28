// 🚀 1. IMPORT ALL AUDIO FILES EXACTLY AS NAMED
import firstAutoTransAudio from '../assets/audio/1st time autotransformer click or after check disabled.wav';
import firstCheckAudio from '../assets/audio/1st time check button click.wav';
import autoConnectAudio from '../assets/audio/Autoconnect.wav';
import mcbAlertAudio from '../assets/audio/Before connection, on-click MCB Alert.wav';
import guideAllCompleteAudio from '../assets/audio/Guide all complete conn.wav';
import multiWrongAudio from '../assets/audio/Multiple wrong connections.wav';
import wrongConnAudio from '../assets/audio/Wrong connection.wav';

import firstReadAddedAudio from '../assets/audio/1st readings added.wav';
import afterCorrVerifAudio from '../assets/audio/After correct verification, verify button.wav';
import afterReadAddClickAudio from '../assets/audio/After taking the readings, Add click.wav';
import afterAutoTransOnAudio from '../assets/audio/After the autotransformer is ON.wav';
import afterVolSetAudio from '../assets/audio/After Voltage is set.wav';
import forCorrConnCheckClickAudio from '../assets/audio/For correct connections, check click.wav';
import genRepBtnClickAudio from '../assets/audio/Generate Report button click.wav';
import incompltMultiValAudio from '../assets/audio/Incomplete more than one value.wav';
import incompltOneValAudio from '../assets/audio/Incomplete one value.wav';
import incorrCalcOneAudio from '../assets/audio/Incorrect calculation, one only.wav';
import incorrCalcMultiAudio from '../assets/audio/Incorrect calculations, more than one.wav';
import mcbOnAudio from '../assets/audio/MCB ON.wav';
import printAudio from '../assets/audio/Print.wav';
import resetAudio from '../assets/audio/Reset.wav';

// 🚀 2. CREATE AUDIO OBJECTS
const alertSounds = {
  firstAutoTransClick: typeof Audio !== "undefined" ? new Audio(firstAutoTransAudio) : null,
  firstCheck: typeof Audio !== "undefined" ? new Audio(firstCheckAudio) : null,
  autoConnect: typeof Audio !== "undefined" ? new Audio(autoConnectAudio) : null,
  mcbAlert: typeof Audio !== "undefined" ? new Audio(mcbAlertAudio) : null,
  guideAllComplete: typeof Audio !== "undefined" ? new Audio(guideAllCompleteAudio) : null,
  multiWrong: typeof Audio !== "undefined" ? new Audio(multiWrongAudio) : null,
  wrongConn: typeof Audio !== "undefined" ? new Audio(wrongConnAudio) : null,

  firstReadAdded: typeof Audio !== "undefined" ? new Audio(firstReadAddedAudio) : null,
  afterCorrVerif: typeof Audio !== "undefined" ? new Audio(afterCorrVerifAudio) : null,
  afterReadAddClick: typeof Audio !== "undefined" ? new Audio(afterReadAddClickAudio) : null,
  afterAutoTransOn: typeof Audio !== "undefined" ? new Audio(afterAutoTransOnAudio) : null,
  afterVolSet: typeof Audio !== "undefined" ? new Audio(afterVolSetAudio) : null,
  forCorrConnCheckClick: typeof Audio !== "undefined" ? new Audio(forCorrConnCheckClickAudio) : null,
  genRepBtnClick: typeof Audio !== "undefined" ? new Audio(genRepBtnClickAudio) : null,
  incompltMultiVal: typeof Audio !== "undefined" ? new Audio(incompltMultiValAudio) : null,
  incompltOneVal: typeof Audio !== "undefined" ? new Audio(incompltOneValAudio) : null,
  incorrCalcOne: typeof Audio !== "undefined" ? new Audio(incorrCalcOneAudio) : null,
  incorrCalcMulti: typeof Audio !== "undefined" ? new Audio(incorrCalcMultiAudio) : null,
  mcbOn: typeof Audio !== "undefined" ? new Audio(mcbOnAudio) : null,
  print: typeof Audio !== "undefined" ? new Audio(printAudio) : null,
  reset: typeof Audio !== "undefined" ? new Audio(resetAudio) : null,
};

// Variable to keep track of the currently playing audio
let currentPlayingAudio = null;

// 🚀 3. PLAY FUNCTION
export const playAlertSound = (key) => {
  const sound = alertSounds[key];
  if (sound) {
    // If another sound is already playing, stop it first
    if (currentPlayingAudio) {
      currentPlayingAudio.pause();
      currentPlayingAudio.currentTime = 0;
    }
    
    sound.currentTime = 0;
    sound.play().catch((e) => console.warn(`Audio playback blocked for ${key}:`, e));
    
    // Set the new sound as the currently playing one
    currentPlayingAudio = sound;
  } else {
    console.log(`Audio key '${key}' not found.`);
  }
};

// 🚀 4. STOP FUNCTION (Call this when "OK" is clicked)
export const stopAlertSound = () => {
  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio.currentTime = 0;
    currentPlayingAudio = null;
  }
};