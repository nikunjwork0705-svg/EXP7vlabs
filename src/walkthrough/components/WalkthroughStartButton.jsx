import { motion } from 'framer-motion'
import { useWalkthrough } from '../useWalkthrough.js'

const WalkthroughStartButton = () => {
  const { experimentName, isOpen, start, totalSteps } = useWalkthrough()

  if (isOpen || totalSteps === 0) {
    return null
  }

  return (
    <motion.button
      aria-label={`Start walkthrough for ${experimentName}`}
      // 1. Add both the base class and the side-tab modifier class
      className="walkthrough-start-button walkthrough-start-button--side-tab"
      id="walkthrough-start-button"
      
      // 2. Animate sliding in from the left (-x) rather than rotating
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      
      // 3. Match the hover/active states we defined in CSS 
      // (Framer Motion inline transforms can sometimes override CSS pseudo-classes, 
      // so it's safest to define them here)
      whileHover={{ filter: "brightness(1.07)" }}
      whileTap={{ x: -2 }} 
      
      // We can drop transformOrigin since we aren't rotating the parent container anymore
      onClick={() => start()}
      type="button"
    >
      {/* 4. Keep this exact DOM structure for the CSS nth-child targeting to work */}
      <span className="walkthrough-start-button__spark" aria-hidden="true" />
      <span>Start Walkthrough</span>
    </motion.button>
  )
}

export default WalkthroughStartButton