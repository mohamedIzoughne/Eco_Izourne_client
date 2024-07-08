import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

const Reveal = ({
  children,
  className = '',
  width = 'fit-content',
}: {
  children: React.ReactNode
  className?: string
  width?: string
}) => {
  const ref = useRef(null)
  //   const slideRef = useRef(null)
  const isInView = useInView(ref, { margin: '0px 0px -50px 0px', once: false })
  //   const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [isInView, controls])

  return (
    <div
      className={className}
      style={{ position: 'relative', width }}
      ref={ref}
    >
      <motion.div
        className='h-full'
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial='hidden'
        animate={controls}
        transition={{
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
      {/* <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' },
        }}
        initial='hidden'
        animate={controls}
        transition={{
          //   delay: 0.25,
          duration: 0.5,
          ease: 'easeIn',
        }}
        className='absolute top-[4px] bottom-[4px] bg-main left-0 right-0'
      ></motion.div> */}
    </div>
  )
}

export default Reveal
