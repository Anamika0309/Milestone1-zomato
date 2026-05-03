'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import RecommendationCard from '../components/RecommendationCard'
import PreferenceForm from '../components/PreferenceForm'
import ThemeToggle from '../components/ThemeToggle'

export default function Home() {
  const [recommendations, setRecommendations] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'dark'
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const handleRecommendations = async (preferences: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/v1/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preference: preferences }),
      })

      if (response.ok) {
        const data = await response.json()
        setRecommendations(data)
        router.push('/recommendations')
      } else {
        console.error('Failed to get recommendations')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/80 dark:bg-gray-900/80 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍽️</span>
              <h1 className="text-2xl font-bold text-white">Crave AI</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Personalized
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              {' '}Restaurant Guide
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Let our AI sommelier curate the perfect dining experience based on your unique preferences
          </p>
          
          {/* Food Emoji Row */}
          <div className="flex justify-center space-x-4 mb-12 text-4xl">
            <span>🍕</span>
            <span>🍜</span>
            <span>🍛️</span>
            <span>🍝</span>
            <span>🥘</span>
            <span>🍱️</span>
            <span>🍗</span>
            <span>🥙</span>
          </div>

          {/* AI Engine Pill */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-3 mb-8">
            <span className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
            <span className="text-white font-medium">Powered by Advanced AI</span>
          </div>
        </div>
      </section>

      {/* Preference Form */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Tell Us Your Preferences
            </h3>
            <PreferenceForm onSubmit={handleRecommendations} loading={loading} />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">AI-Powered</h4>
              <p className="text-gray-300">
                Advanced machine learning algorithms analyze your preferences to find the perfect restaurant matches.
              </p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Location-Based</h4>
              <p className="text-gray-300">
                Get recommendations tailored to your specific neighborhood and preferred dining areas.
              </p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Quality Focused</h4>
              <p className="text-gray-300">
                Only the best-rated restaurants with excellent reviews and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            🍽️ Crave AI - Your Personal Restaurant Guide | Built with AI
          </p>
        </div>
      </footer>
    </div>
  )
}
