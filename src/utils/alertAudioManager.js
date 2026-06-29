// Remove all the "import ... from '../assets/audio/...'" lines.
// Replace them with simple path strings:

const afterCorrVerifAudio = "/audio/After correct verification, verify button.wav";
const forCorrConnCheckClickAudio = "/audio/For correct connections, check click.wav";
const genRepBtnClickAudio = "/audio/Generate Report button click.wav";

// ... keep the rest of your existing logic below this ...

// 2. CREATE AUDIO OBJECTS
const alertSounds = {
  // 🚀 Direct paths to your public/audio folder!
  firstAutoTransClick: typeof Audio !== "undefined" ? new Audio('/audio/1st time autotransformer click.wav') : null,
  firstCheck: typeof Audio !== "undefined" ? new Audio('/audio/1st time check button click.wav') : null,
  autoConnect: typeof Audio !== "undefined" ? new Audio('/audio/Autoconnect.wav') : null,
  mcbAlert: typeof Audio !== "undefined" ? new Audio('/audio/Before connection, on-click MCB Alert.wav') : null,
  guideAllComplete: typeof Audio !== "undefined" ? new Audio('/audio/Guide all complete conn.wav') : null,
  multiWrong: typeof Audio !== "undefined" ? new Audio('/audio/Multiple wrong connections.wav') : null,
  wrongConn: typeof Audio !== "undefined" ? new Audio('/audio/Wrong connection.wav') : null,
  firstReadAdded: typeof Audio !== "undefined" ? new Audio('/audio/1st readings added.wav') : null,
  afterReadAddClick: typeof Audio !== "undefined" ? new Audio('/audio/After taking the readings, Add click.wav') : null,
  afterAutoTransOn: typeof Audio !== "undefined" ? new Audio('/audio/After the autotransformer is ON.wav') : null,
  afterVolSet: typeof Audio !== "undefined" ? new Audio('/audio/After Voltage is set.wav') : null,
  incompltMultiVal: typeof Audio !== "undefined" ? new Audio('/audio/Incomplete more than one value.wav') : null,
  incompltOneVal: typeof Audio !== "undefined" ? new Audio('/audio/Incomplete one value.wav') : null,
  incorrCalcOne: typeof Audio !== "undefined" ? new Audio('/audio/Incorrect calculation, one only.wav') : null,
  incorrCalcMulti: typeof Audio !== "undefined" ? new Audio('/audio/Incorrect calculations, more than one.wav') : null,
  mcbOn: typeof Audio !== "undefined" ? new Audio('/audio/MCB ON.wav') : null,
  print: typeof Audio !== "undefined" ? new Audio('/audio/Print.wav') : null,
  reset: typeof Audio !== "undefined" ? new Audio('/audio/Reset.wav') : null,

  // Using the imports for the files that are still in your src/assets/audio folder
  afterCorrVerif: typeof Audio !== "undefined" ? new Audio(afterCorrVerifAudio) : null,
  forCorrConnCheckClick: typeof Audio !== "undefined" ? new Audio(forCorrConnCheckClickAudio) : null,
  genRepBtnClick: typeof Audio !== "undefined" ? new Audio(genRepBtnClickAudio) : null,
};

let currentPlayingAudio = null;

// 🚀 3. PLAY FUNCTION
export const playAlertSound = (key) => {
  const sound = alertSounds[key];
  if (sound) {
    if (currentPlayingAudio) {
      currentPlayingAudio.pause();
      currentPlayingAudio.currentTime = 0;
    }
    
    sound.currentTime = 0;
    sound.play().catch((e) => console.warn(`Audio playback blocked for ${key}:`, e));
    
    currentPlayingAudio = sound;
  } else {
    console.log(`Audio key '${key}' not found.`);
  }
};

// 🚀 4. STOP FUNCTION 
export const stopAlertSound = () => {
  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio.currentTime = 0;
    currentPlayingAudio = null;
  }
};