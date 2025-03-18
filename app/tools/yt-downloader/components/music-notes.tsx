"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music } from "lucide-react"

export default function MusicNotes() {
  const [notes, setNotes] = useState<{ id: number; x: number; size: number; duration: number; delay: number }[]>([])

  useEffect(() => {
    // Create initial notes
    const initialNotes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))

    setNotes(initialNotes)

    // Add new notes periodically
    const interval = setInterval(() => {
      const newNote = {
        id: Date.now(),
        x: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 10 + 10,
        delay: 0,
      }

      setNotes((prev) => [...prev.slice(-14), newNote])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className="absolute bottom-0"
            style={{ left: `${note.x}%` }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -window.innerHeight, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: note.duration,
              delay: note.delay,
              ease: "linear",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              {Math.random() > 0.5 ? (
                <Music
                  size={note.size}
                  className={
                    Math.random() > 0.5
                      ? "text-red-500/70 dark:text-red-400/70"
                      : "text-green-500/70 dark:text-green-400/70"
                  }
                />
              ) : (
                <svg
                  width={note.size}
                  height={note.size}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18V5L21 3V16"
                    stroke={Math.random() > 0.5 ? "#ef4444" : "#22c55e"}
                    strokeOpacity="0.7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="6"
                    cy="18"
                    r="3"
                    stroke={Math.random() > 0.5 ? "#ef4444" : "#22c55e"}
                    strokeOpacity="0.7"
                    strokeWidth="2"
                  />
                  <circle
                    cx="18"
                    cy="16"
                    r="3"
                    stroke={Math.random() > 0.5 ? "#ef4444" : "#22c55e"}
                    strokeOpacity="0.7"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

