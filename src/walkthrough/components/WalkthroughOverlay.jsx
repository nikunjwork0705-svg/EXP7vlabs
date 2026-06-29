import { AnimatePresence, motion } from 'framer-motion'
import { useWalkthrough } from '../useWalkthrough.js'
import Spotlight from './Spotlight.jsx'
import WalkthroughPopup from './WalkthroughPopup.jsx'

const WalkthroughOverlay = () => {
  const {
    activeStep,
    autoPlayAudioForStep, // 🚀 Pulling dynamic state directly from your App.jsx AI Guide mode
    canGoNext,
    canGoPrevious,
    close,
    currentStep,
    isOpen,
    isPositioningTarget,
    next,
    previous,
    targetRect,
    totalSteps,
    goToStep
  } = useWalkthrough()

  return (
    <AnimatePresence>
      {isOpen && activeStep ? (
        <motion.div
          aria-live="polite"
          className="walkthrough-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div aria-hidden="true" className="walkthrough-interaction-shield" />
          <Spotlight rect={isPositioningTarget ? null : targetRect} />
          <AnimatePresence mode="wait">
            {!isPositioningTarget && targetRect ? (
              <WalkthroughPopup
                activeStep={activeStep}
                autoPlayAudio={autoPlayAudioForStep} // 🚀 Pass it directly to the Popup
                canGoNext={canGoNext}
                canGoPrevious={canGoPrevious}
                currentStep={currentStep}
                key={activeStep.id}
                onClose={close}
                onNext={next}
                onPrevious={previous}
                onSkip={() => goToStep(totalSteps - 1)}
                targetRect={targetRect}
                totalSteps={totalSteps}
              />
            ) : null}
          </AnimatePresence>
          <span className="sr-only">
            Step {currentStep} of {totalSteps}: {activeStep.title}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default WalkthroughOverlay