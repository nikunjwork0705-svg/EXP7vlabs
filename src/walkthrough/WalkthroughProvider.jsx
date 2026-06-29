import { useCallback, useEffect, useMemo, useState } from 'react'
import defaultWalkthroughConfig from './walkthroughConfig.json'
import { WalkthroughContext } from './WalkthroughContext.js'
import { loadWalkthroughConfig } from './walkthroughConfigLoader.js'
import WalkthroughOverlay from './components/WalkthroughOverlay.jsx'
import './walkthrough.css'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const getElementRect = (element) => {
  if (!element) return null
  const rect = element.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) return null
  return { bottom: rect.bottom, height: rect.height, left: rect.left, right: rect.right, top: rect.top, width: rect.width }
}

const WalkthroughProvider = ({
  children,
  config = defaultWalkthroughConfig,
  locale,
  onComplete,
  onExit,
  isAudioEnabled
}) => {
  const walkthroughConfig = useMemo(
    () => loadWalkthroughConfig(config, locale ?? config?.defaultLocale),
    [config, locale],
  )

  const [isOpen, setIsOpen] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPositioningTarget, setIsPositioningTarget] = useState(false)
  const [targetRect, setTargetRect] = useState(null)

  const totalSteps = walkthroughConfig.steps.length
  const activeStep = isOpen ? walkthroughConfig.steps[currentStepIndex] : null
  const currentStep = currentStepIndex + 1
  const activeTargetSelector = activeStep?.target

  const handleExit = useCallback(() => {
    setIsOpen(false)
    if (onExit) onExit()
  }, [onExit])

  const handleComplete = useCallback(() => {
    setIsOpen(false)
    if (onComplete) onComplete()
  }, [onComplete])

  const moveToStep = useCallback((stepIndex) => {
    if (totalSteps === 0) return
    setTargetRect(null)
    setIsPositioningTarget(true)
    setCurrentStepIndex(clamp(stepIndex, 0, totalSteps - 1))
  }, [totalSteps])

  const next = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      moveToStep(currentStepIndex + 1)
    } else {
      handleComplete()
    }
  }, [currentStepIndex, totalSteps, moveToStep, handleComplete])

  const previous = useCallback(() => {
    moveToStep(currentStepIndex - 1)
  }, [currentStepIndex, moveToStep])

  const start = useCallback(() => setIsOpen(true), [])

  // 🚀 FIXED: Dynamic Positioning Logic
  useEffect(() => {
    if (!isOpen || !activeTargetSelector) return;
    
    const target = document.querySelector(activeTargetSelector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    let frameId;

    // This function continuously tracks the element so the spotlight 
    // stays perfectly aligned even during scrolling, resizing, or layout shifts.
    const trackPosition = () => {
      const currentRect = getElementRect(target);
      
      setTargetRect((prevRect) => {
        if (!prevRect && !currentRect) return prevRect;
        if (!prevRect || !currentRect) return currentRect;
        
        // Only trigger a re-render if the element actually moved by more than 0.5px
        if (
          Math.abs(prevRect.top - currentRect.top) > 0.5 ||
          Math.abs(prevRect.left - currentRect.left) > 0.5 ||
          Math.abs(prevRect.width - currentRect.width) > 0.5 ||
          Math.abs(prevRect.height - currentRect.height) > 0.5
        ) {
          return currentRect;
        }
        return prevRect;
      });
      
      frameId = requestAnimationFrame(trackPosition);
    };

    trackPosition();
    
    // Clear the positioning flag after a tiny delay so the spotlight can render
    const timer = setTimeout(() => setIsPositioningTarget(false), 50);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [activeTargetSelector, isOpen, currentStepIndex]);

  // 🚀 UPGRADED: Bulletproof Scroll Lock
  useEffect(() => {
    if (isOpen) {
      // Lock both HTML and Body to prevent all scrolling
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Prevent iOS Safari bounce/scroll
      document.body.style.touchAction = 'none'; 
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // 3. Keyboard Nav
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') handleExit()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') previous()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, next, previous, handleExit])

  const contextValue = useMemo(() => ({
    activeStep, 
    close: handleExit, 
    currentStep, 
    isOpen, 
    next, 
    previous,
    start, 
    totalSteps,
    targetRect,
    isPositioningTarget,
    canGoNext: currentStepIndex < totalSteps - 1,
    canGoPrevious: currentStepIndex > 0,
    goToStep: moveToStep,
    autoPlayAudioForStep: isAudioEnabled
  }), [
    activeStep, currentStep, isOpen, next, previous, start, totalSteps, 
    handleExit, targetRect, isPositioningTarget, currentStepIndex, moveToStep, isAudioEnabled
  ])

  return (
    <WalkthroughContext.Provider value={contextValue}>
      {children}
      <WalkthroughOverlay />
    </WalkthroughContext.Provider>
  )
}

export default WalkthroughProvider