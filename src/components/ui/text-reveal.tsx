import { useRef } from "react"
import type { FC, ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  delay = 0,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1], // Custom easing for luxury feel
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
