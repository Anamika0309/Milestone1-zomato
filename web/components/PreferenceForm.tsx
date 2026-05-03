'use client'

import { useState } from 'react'

interface PreferenceFormProps {
  onSubmit: (preferences: any) => void
  loading: boolean
}

export default function PreferenceForm({ onSubmit, loading }: PreferenceFormProps) {
  const [preferences, setPreferences] = useState({
    location: 'Brookefield',
    budget: 'medium',
    cuisines: ['Indian'],
    minRating: 4.0,
    additionalNotes: ''
  })

  const locations = ['Brookefield', 'Koramangala 3Rd Block', 'Indiranagar', 'Whitefield', 'HSR Layout']
  const cuisines = ['Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 'Thai', 'French', 'American', 'Mediterranean', 'Korean', 'Cafe', 'Desserts']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(preferences)
  }

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            📍 Location
          </label>
          <select
            value={preferences.location}
            onChange={(e) => updatePreference('location', e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            💸 Budget
          </label>
          <select
            value={preferences.budget}
            onChange={(e) => updatePreference('budget', e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="low">Budget-friendly (Under ₹300)</option>
            <option value="medium">Moderate (₹300-700)</option>
            <option value="high">Premium (Above ₹700)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            🍽️ Cuisines
          </label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {cuisines.map(cuisine => (
              <label key={cuisine} className="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={preferences.cuisines.includes(cuisine)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updatePreference('cuisines', [...preferences.cuisines, cuisine])
                    } else {
                      updatePreference('cuisines', preferences.cuisines.filter(c => c !== cuisine))
                    }
                  }}
                  className="rounded border-gray-600 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm">{cuisine}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ⭐ Minimum Rating
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={preferences.minRating}
            onChange={(e) => updatePreference('minRating', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300 mt-1">{preferences.minRating} ⭐</div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            💬 Special Requirements
          </label>
          <textarea
            value={preferences.additionalNotes}
            onChange={(e) => updatePreference('additionalNotes', e.target.value)}
            placeholder="e.g., romantic ambiance, outdoor seating, vegetarian options..."
            rows={3}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || preferences.cuisines.length === 0}
        className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {loading ? '🤖 Analyzing...' : '🚀 Get Recommendations'}
      </button>
    </form>
  )
}
