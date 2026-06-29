import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useFocusTrap } from '../hooks/useFocusTrap.js'

const EDGE_GAP = 16
const TARGET_GAP = 18
const DEFAULT_POPUP_SIZE = { height: 280, width: 360 }

const isValidAudioSource = (audio) => Boolean(audio && audio !== '#')
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const getPlacementOrder = (placement) => {
  const fallbackPlacements = ['bottom', 'right', 'left', 'top']
  return [placement, ...fallbackPlacements.filter((item) => item !== placement)].filter(Boolean)
}

const getCandidatePosition = (rect, size, placement) => {
  const target = rect ?? { height: 0, left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0 }
  if (placement === 'top') return { left: target.left + target.width / 2 - size.width / 2, top: target.top - size.height - TARGET_GAP }
  if (placement === 'left') return { left: target.left - size.width - TARGET_GAP, top: target.top + target.height / 2 - size.height / 2 }
  if (placement === 'right') return { left: target.left + target.width + TARGET_GAP, top: target.top + target.height / 2 - size.height / 2 }
  return { left: target.left + target.width / 2 - size.width / 2, top: target.top + target.height + TARGET_GAP }
}

const getPopupPosition = (rect, size, preferredPlacement) => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const maxLeft = Math.max(EDGE_GAP, viewportWidth - size.width - EDGE_GAP)
  const maxTop = Math.max(EDGE_GAP, viewportHeight - size.height - EDGE_GAP)
  const placements = getPlacementOrder(preferredPlacement)

  for (const placement of placements) {
    const candidate = getCandidatePosition(rect, size, placement)
    if (candidate.left >= EDGE_GAP && candidate.left + size.width <= viewportWidth - EDGE_GAP && candidate.top >= EDGE_GAP && candidate.top + size.height <= viewportHeight - EDGE_GAP) {
      return { placement, left: candidate.left, top: candidate.top }
    }
  }
  const fallback = getCandidatePosition(rect, size, preferredPlacement)
  return { placement: preferredPlacement, left: clamp(fallback.left, EDGE_GAP, maxLeft), top: clamp(fallback.top, EDGE_GAP, maxTop) }
}

// 🚀 GLOBAL AUDIO TRACKER: Ensures only one audio file plays at a time across all popups
let globalActiveAudio = null;

const WalkthroughPopup = ({ activeStep, autoPlayAudio, canGoNext, canGoPrevious, currentStep, onClose, onNext, onPrevious, onSkip, targetRect, totalSteps }) => {
  const popupRef = useRef(null)
  const audioRef = useRef(null)
  const [popupSize, setPopupSize] = useState(DEFAULT_POPUP_SIZE)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const displayTitle = typeof activeStep?.title === 'object'
    ? (activeStep.title?.en || Object.values(activeStep.title)[0] || 'Untitled Step')
    : (activeStep?.title || 'Untitled Step');

  const displayDescription = typeof activeStep?.description === 'object'
    ? (activeStep.description?.en || Object.values(activeStep.description)[0] || '')
    : (activeStep?.description || '');

  const audioSource = isValidAudioSource(activeStep.audio) ? activeStep.audio : null
  const titleId = `walkthrough-title-${activeStep.id}`
  const descriptionId = `walkthrough-description-${activeStep.id}`
  const progressPercent = (currentStep / totalSteps) * 100

  useFocusTrap(popupRef, true)

  useLayoutEffect(() => {
    if (popupRef.current) {
      const popupBox = popupRef.current.getBoundingClientRect()
      setPopupSize({ height: popupBox.height, width: popupBox.width })
    }
  }, [activeStep.id, targetRect])

  // 🚀 NEW BLOCK 1: Listen for the AI Guide telling this popup to shut up
  useEffect(() => {
    const handleStopWalkthroughAudio = () => {
      if (globalActiveAudio) {
        globalActiveAudio.pause();
        globalActiveAudio.currentTime = 0;
        globalActiveAudio = null;
        setIsPlaying(false);
      }
    };
    window.addEventListener('force-stop-walkthrough', handleStopWalkthroughAudio);
    return () => window.removeEventListener('force-stop-walkthrough', handleStopWalkthroughAudio);
  }, []);

  useEffect(() => {
    // 🚀 NEW BLOCK 2: Tell the AI Guide to shut up because the Walkthrough is starting
    window.dispatchEvent(new CustomEvent('force-stop-ai-guide'));

    // 🚀 IMMEDIATELY STOP ANY CURRENTLY PLAYING AUDIO
    if (globalActiveAudio) {
      globalActiveAudio.pause();
      globalActiveAudio.currentTime = 0;
    }

    if (!audioSource) {
      audioRef.current = null;
      setIsPlaying(false);
      return;
    }

    const safeUrl = encodeURI(audioSource);
    const audio = new Audio(safeUrl);
    
    audioRef.current = audio;
    globalActiveAudio = audio; // 🚀 Register this as the new active audio

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);

    if (autoPlayAudio) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay blocked: User must click 'Audio' button to start.");
          setIsPlaying(false);
        });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('ended', handleEnded);
      
      // Clear global reference only if it hasn't been overwritten by the next step
      if (globalActiveAudio === audio) {
        globalActiveAudio = null;
      }
    };
  }, [activeStep.id, audioSource, autoPlayAudio]);

  const popupPosition = useMemo(() => getPopupPosition(targetRect, popupSize, activeStep.placement), [activeStep.placement, popupSize, targetRect])

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      // 🚀 Extra safeguard for manual play clicks
      if (globalActiveAudio && globalActiveAudio !== audio) {
        globalActiveAudio.pause();
      }
      globalActiveAudio = audio;
      
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }

  return (
    <motion.aside
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      aria-modal="true"
      className="walkthrough-popup"
      data-placement={popupPosition.placement}
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 10 }}
      ref={popupRef}
      role="dialog"
      style={{ left: popupPosition.left, top: popupPosition.top }}
      tabIndex={-1}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      <div className="walkthrough-popup__header">
        <div>
          <p className="walkthrough-popup__eyebrow">Guided Walkthrough</p>
          <h2 id={titleId}>{displayTitle}</h2>
        </div>
        <button className="walkthrough-popup__icon-button" onClick={onClose} type="button"><span>&times;</span></button>
      </div>

      <p className="walkthrough-popup__description" id={descriptionId} dangerouslySetInnerHTML={{ __html: displayDescription }} />

      <div className="walkthrough-popup__progress" aria-hidden="true">
        <span style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="walkthrough-popup__meta">
        <span>{currentStep} / {totalSteps}</span>
        <button className="walkthrough-popup__audio" disabled={!audioSource} onClick={toggleAudio} type="button">
          {isPlaying ? 'Pause' : 'Audio'}
        </button>
      </div>

      <div className="walkthrough-popup__actions">
        <button className="walkthrough-popup__button walkthrough-popup__button--secondary" disabled={!canGoPrevious} onClick={onPrevious} type="button">Previous</button>
        {currentStep < totalSteps ? (
          <button className="walkthrough-popup__button walkthrough-popup__button--secondary" onClick={onSkip} type="button">Skip</button>
        ) : (
          <button className="walkthrough-popup__button walkthrough-popup__button--secondary" onClick={onClose} type="button">Exit</button>
        )}
        <button className="walkthrough-popup__button walkthrough-popup__button--primary" data-autofocus disabled={!canGoNext} onClick={onNext} type="button">Next</button>
      </div>
    </motion.aside>
  )
}

export default WalkthroughPopup