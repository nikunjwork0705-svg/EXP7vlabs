// const FALLBACK_LOCALE = 'en'

// const getLocalizedValue = (value, locale, fallbackLocale) => {
//   if (typeof value === 'string') {
//     return value
//   }

//   if (!value || typeof value !== 'object') {
//     return ''
//   }

//   return (
//     value[locale]
//     ?? value[fallbackLocale]
//     ?? value[FALLBACK_LOCALE]
//     ?? Object.values(value).find((entry) => typeof entry === 'string')
//     ?? ''
//   )
// }

// export const loadWalkthroughConfig = (config, locale = FALLBACK_LOCALE) => {
//   const defaultLocale = config?.defaultLocale ?? FALLBACK_LOCALE
//   const resolvedLocale = locale || defaultLocale
//   const rawSteps = Array.isArray(config?.steps) ? config.steps : []

//   return {
//     audio: config?.audio ?? {},
//     defaultLocale,
//     experimentName: getLocalizedValue(config?.experimentName, resolvedLocale, defaultLocale)
//       || config?.experimentName
//       || 'Experiment Walkthrough',
//     locale: resolvedLocale,
//     locales: config?.locales ?? [defaultLocale],
//     steps: rawSteps
//       .filter((step) => step?.target)
//       .map((step, index) => ({
//         ...step,
//         description: getLocalizedValue(step.description, resolvedLocale, defaultLocale),
//         id: String(step.id ?? index + 1),
//         placement: step.placement ?? 'bottom',
//         title: getLocalizedValue(step.title, resolvedLocale, defaultLocale),
//       })),
//   }
// }
// Define it right here so it doesn't break if WalkthroughContext doesn't export it
const FALLBACK_LOCALE = 'en';

// Import all audio files
import aimAudio from '../assets/audio/Aim.wav';
import instButtonAudio from '../assets/audio/Instructions Button.wav';
import aiGuideButtonAudio from '../assets/audio/AI Guide Button.wav';
import checkButtonAudio from '../assets/audio/Check Button.wav';
import autoConnectButtonAudio from '../assets/audio/Auto Connect Button.wav';
import addButtonAudio from '../assets/audio/Add Button.wav';
import resetButtonAudio from '../assets/audio/Reset Button-.wav';
import printButtonAudio from '../assets/audio/Print Button.wav';
import mathExprAudio from '../assets/audio/Mathematical Expressions.wav';
import mcbAudio from '../assets/audio/MCB.wav';
import variacAudio from '../assets/audio/Autotransformer.wav';
import resistorAudio from '../assets/audio/Resistor.wav';
import inductorAudio from '../assets/audio/Inductor.wav';
import capacitorAudio from '../assets/audio/Capacitor.wav';
import voltmeterAudio from '../assets/audio/AC Voltmeter.wav';
import ammeter1Audio from '../assets/audio/AC Ammeter 1.wav';
import wattmeterAudio from '../assets/audio/AC Wattmeter.wav';
import ammeter2Audio from '../assets/audio/AC Ammeter 2.wav';
import ammeter3Audio from '../assets/audio/AC Ammeter 3.wav';
import ammeter4Audio from '../assets/audio/AC Ammeter 4.wav';
import obsTableAudio from '../assets/audio/Observation Table.wav';
import theoCalcAudio from '../assets/audio/Theoretical Calculations.wav';
import genReportAudio from '../assets/audio/Generate Report.wav';

// Ensure these keys exactly match the filenames in your src/assets/audio/
const audioMap = {
  "Aim.wav": aimAudio,
  "Instructions Button.wav": instButtonAudio,
  "AI Guide Button.wav": aiGuideButtonAudio,
  "Check Button.wav": checkButtonAudio,
  "Auto Connect Button.wav": autoConnectButtonAudio,
  "Add Button.wav": addButtonAudio,
  "Reset Button-.wav": resetButtonAudio,
  "Print Button.wav": printButtonAudio,
  "Mathematical Expressions.wav": mathExprAudio, 
  "MCB.wav": mcbAudio,
  "Autotransformer.wav": variacAudio,
  "Resistor.wav": resistorAudio,
  "Inductor.wav": inductorAudio,
  "Capacitor.wav": capacitorAudio,
  "AC Voltmeter.wav": voltmeterAudio,
  "AC Ammeter 1.wav": ammeter1Audio,
  "AC Wattmeter.wav": wattmeterAudio,
  "AC Ammeter 2.wav": ammeter2Audio,
  "AC Ammeter 3.wav": ammeter3Audio,
  "AC Ammeter 4.wav": ammeter4Audio,
  "Observation Table.wav": obsTableAudio,
  "Theoretical Calculations.wav": theoCalcAudio,
  "Generate Report.wav": genReportAudio
};

const getLocalizedValue = (value, locale, fallbackLocale) => {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  return value[locale] ?? value[fallbackLocale] ?? value[FALLBACK_LOCALE] ?? '';
};

export const loadWalkthroughConfig = (config, locale = FALLBACK_LOCALE) => {
  const defaultLocale = config?.defaultLocale ?? FALLBACK_LOCALE;
  const resolvedLocale = locale || defaultLocale;
  const rawSteps = Array.isArray(config?.steps) ? config.steps : [];

  return {
    audio: config?.audio ?? {},
    defaultLocale,
    experimentName: getLocalizedValue(config?.experimentName, resolvedLocale, defaultLocale)
      || config?.experimentName
      || 'Experiment Walkthrough',
    locale: resolvedLocale,
    locales: config?.locales ?? [defaultLocale],
    steps: rawSteps
      .filter((step) => step?.target)
      .map((step, index) => ({
        ...step,
        // 🚀 Resolve filename to imported file URL
        audio: step.audio && step.audio !== "#" ? audioMap[step.audio] : null,
        description: getLocalizedValue(step.description, resolvedLocale, defaultLocale),
        id: String(step.id ?? index + 1),
        placement: step.placement ?? 'bottom',
        title: getLocalizedValue(step.title, resolvedLocale, defaultLocale),
      })),
  };
};