'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
  words: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function Typewriter({
  words,
  className,
  typingSpeed = 75,
  deletingSpeed = 38,
  pauseDuration = 2200,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]

    if (!isDeleting && displayed === current) {
      const t = setTimeout(() => setIsDeleting(true), pauseDuration)
      return () => clearTimeout(t)
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setWordIndex(i => (i + 1) % words.length)
      return
    }

    const delay = isDeleting ? deletingSpeed : typingSpeed
    const t = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1),
      )
    }, delay)

    return () => clearTimeout(t)
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-block w-[3px] bg-current ml-1 align-middle"
        style={{ height: '0.85em', verticalAlign: 'middle', marginBottom: '0.1em' }}
      />
    </span>
  )
}
