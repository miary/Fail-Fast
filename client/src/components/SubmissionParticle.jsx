// client/src/components/SubmissionParticle.jsx
const particleVariants = {
  enter: { y: 0, opacity: 1 },
  process: { y: 250, scale: 0.8 },
  // Conditional branching based on backend status
  exit: (status) => ({
    x: status === 'FAILED_FAST' ? 600 : 0, // Fly off screen if failed
    y: status === 'FAILED_FAST' ? 400 : 600, // Drop to bottom if prototype
    opacity: 0,
    transition: { duration: 0.8, ease: "circIn" }
  })
};