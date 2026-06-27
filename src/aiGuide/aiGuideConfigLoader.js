const FALLBACK_LOCALE = 'en';

// 🚀 IMPORT EXISTING AI GUIDE AUDIO FILES
import aiGuideClick from '../assets/audio/AI Guide click.wav';
import interfaceComplete from '../assets/audio/The interface walkthrough is now complete.wav';
import conn1to23 from '../assets/audio/Connect terminal 1 to terminal 23.wav'; 
import conn2to24 from '../assets/audio/Connect terminal 2 to terminal 24..wav';
import conn3to25 from '../assets/audio/Connect terminal 3 to terminal 25..wav';
import conn4to26 from '../assets/audio/Connect terminal 4 to terminal 26..wav';
import conn5to25 from '../assets/audio/Connect terminal 5 to terminal 25.wav';
import conn6to9 from '../assets/audio/Connect terminal 6 to terminal 9. .wav';
import conn6to10 from '../assets/audio/Connect terminal 6 to terminal 10..wav';
import conn7to18 from '../assets/audio/Connect terminal 7 to terminal 18..wav';
import conn8to11 from '../assets/audio/Connect terminal 8 to terminal 11. .wav';
import conn11to13 from '../assets/audio/Connect terminal 11 to terminal 13.wav';
import conn13to15 from '../assets/audio/Connect terminal 13 to terminal 15.wav';
import conn12to17 from '../assets/audio/Connect terminal 12 to terminal 17.wav';
import conn18to20 from '../assets/audio/Connect terminal 18 to terminal 20.wav';
import conn14to19 from '../assets/audio/Connect terminal 14 to terminal 19.wav';
import conn16to21 from '../assets/audio/Connect terminal 16 to terminal 21.wav';
import conn20to22 from '../assets/audio/Connect terminal 20 to terminal 22.wav';
import conn26to7 from '../assets/audio/Connect terminal 26 to terminal 7. .wav';

// 🚀 UNCOMMENT THESE IMPORTS WHEN YOU ADD THE FILES
// import guideAllComplete from '../assets/audio/Guide all complete conn.wav';
// import wrongConn from '../assets/audio/Wrong connection.wav';
// import multiWrongConn from '../assets/audio/Multiple wrong connections.wav';
// import firstCheckClick from '../assets/audio/1st time check button click.wav';
// import autoConnAlert from '../assets/audio/Autoconnect.wav';
// import beforeConnMcb from '../assets/audio/Before connection on-click MCB Alert.wav';
// import firstAutoTransClick from '../assets/audio/1st time autotransformer click.wav';
// import connVerified from '../assets/audio/Connections Verified.wav';
// import mcbOnAlert from '../assets/audio/MCB ON.wav';
// import afterAutoTransOn from '../assets/audio/After the autotransformer is ON.wav';
// import afterVolSet from '../assets/audio/After Voltage is set.wav';
// import firstReadAdded from '../assets/audio/1st readings added.wav';
// import afterReadAddClick from '../assets/audio/After taking the readings Add click.wav';
// import theoCalcVerif from '../assets/audio/Theoretical calculations verified.wav';
// import incompltMultiVal from '../assets/audio/Incomplete more than one value.wav';
// import incompltOneVal from '../assets/audio/Incomplete one value.wav';
// import incorrCalcMulti from '../assets/audio/Incorrect calculations more than one.wav';
// import incorrCalcOne from '../assets/audio/Incorrect calculation one only.wav';
// import repGen from '../assets/audio/Report Generated.wav';
// import resetAlert from '../assets/audio/Reset.wav';
// import printAlert from '../assets/audio/Print.wav';


// 🚀 CREATE THE MAP
const aiAudioMap = {
  "AI Guide click.wav": aiGuideClick,
  "The interface walkthrough is now complete.wav": interfaceComplete,
  "Connect terminal 1 to terminal 23.wav": conn1to23, 
  "Connect terminal 2 to terminal 24..wav": conn2to24,
  "Connect terminal 3 to terminal 25..wav": conn3to25,
  "Connect terminal 4 to terminal 26..wav": conn4to26,
  "Connect terminal 5 to terminal 25.wav": conn5to25,
  "Connect terminal 6 to terminal 9. .wav": conn6to9,
  "Connect terminal 6 to terminal 10..wav": conn6to10,
  "Connect terminal 7 to terminal 18..wav": conn7to18,
  "Connect terminal 8 to terminal 11. .wav": conn8to11,
  "Connect terminal 11 to terminal 13.wav": conn11to13,
  "Connect terminal 13 to terminal 15.wav": conn13to15,
  "Connect terminal 12 to terminal 17.wav": conn12to17,
  "Connect terminal 18 to terminal 20.wav": conn18to20,
  "Connect terminal 14 to terminal 19.wav": conn14to19,
  "Connect terminal 16 to terminal 21.wav": conn16to21,
  "Connect terminal 20 to terminal 22.wav": conn20to22,
  "Connect terminal 26 to terminal 7. .wav": conn26to7,
  
  // 🚀 UNCOMMENT THESE MAPPINGS WHEN YOU ADD THE FILES
  // "Guide all complete conn.wav": guideAllComplete,
  // "Wrong connection.wav": wrongConn,
  // "Multiple wrong connections.wav": multiWrongConn,
  // "1st time check button click.wav": firstCheckClick,
  // "Autoconnect.wav": autoConnAlert,
  // "Before connection on-click MCB Alert.wav": beforeConnMcb,
  // "1st time autotransformer click.wav": firstAutoTransClick,
  // "Connections Verified.wav": connVerified,
  // "MCB ON.wav": mcbOnAlert,
  // "After the autotransformer is ON.wav": afterAutoTransOn,
  // "After Voltage is set.wav": afterVolSet,
  // "1st readings added.wav": firstReadAdded,
  // "After taking the readings Add click.wav": afterReadAddClick,
  // "Theoretical calculations verified.wav": theoCalcVerif,
  // "Incomplete more than one value.wav": incompltMultiVal,
  // "Incomplete one value.wav": incompltOneVal,
  // "Incorrect calculations more than one.wav": incorrCalcMulti,
  // "Incorrect calculation one only.wav": incorrCalcOne,
  // "Report Generated.wav": repGen,
  // "Reset.wav": resetAlert,
  // "Print.wav": printAlert
};

const getLocalizedValue = (value, locale, fallbackLocale) => {
  if (typeof value === 'string') {
    return value
  }

  if (!value || typeof value !== 'object') {
    return ''
  }

  return (
    value[locale]
    ?? value[fallbackLocale]
    ?? value[FALLBACK_LOCALE]
    ?? Object.values(value).find((entry) => typeof entry === 'string')
    ?? ''
  )
}

export const isConfiguredAudioSource = (audio) => Boolean(audio && audio !== '#')

export const loadAiGuideConfig = (config, locale = FALLBACK_LOCALE) => {
  const defaultLocale = config?.defaultLocale ?? FALLBACK_LOCALE
  const resolvedLocale = locale || defaultLocale
  const rawSteps = Array.isArray(config?.steps) ? config.steps : []

  return {
    defaultLocale,
    guideName: getLocalizedValue(config?.guideName, resolvedLocale, defaultLocale)
      || config?.guideName
      || 'AI Guide',
    locale: resolvedLocale,
    locales: config?.locales ?? [defaultLocale],
    steps: rawSteps
      .map((step, index) => ({
        ...step,
        // Map the JSON filename to the actual imported URL
        audio: step?.audio && step.audio !== '#' ? aiAudioMap[step.audio] : '#',
        id: String(step?.id ?? index + 1),
        text: getLocalizedValue(step?.text, resolvedLocale, defaultLocale),
      }))
      .filter((step) => step.text),
  }
}