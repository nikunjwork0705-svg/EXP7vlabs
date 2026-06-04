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
      className="walkthrough-start-button"
      id="walkthrough-start-button"
      style={{ transformOrigin: "left top" }} 
      initial={{ opacity: 0, x: -16, rotate: -90 }}
      animate={{ opacity: 1, x: 0, rotate: -90 }}
      whileHover={{ scale: 1.03, rotate: -90 }}
      whileTap={{ scale: 0.98, rotate: -90 }}
      
      onClick={() => start()}
      type="button"
    >
      <span className="walkthrough-start-button__spark" aria-hidden="true" />
      <span>Start Walkthrough</span>
    </motion.button>
  )
}

export default WalkthroughStartButton