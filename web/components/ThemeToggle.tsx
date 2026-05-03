'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    const shouldDark = savedTheme ? savedTheme === 'dark' : true
    setIsDark(shouldDark)

    if (shouldDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-yellow-400 hover:text-yellow-300 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}
