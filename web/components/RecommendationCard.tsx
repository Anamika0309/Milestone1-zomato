'use client'

interface RecommendationCardProps {
  card: any
}

export default function RecommendationCard({ card }: RecommendationCardProps) {
  const getImage = (cuisines: string[]) => {
    const cuisineImages: Record<string, string> = {
      italian: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=250&fit=crop',
      chinese: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=250&fit=crop',
      indian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=250&fit=crop',
      mexican: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=250&fit=crop',
      japanese: 'https://images.unsplash.com/photo-1579871494447-53cf0c9354d6?w=400&h=250&fit=crop',
      thai: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=250&fit=crop',
      french: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
      american: 'https://images.unsplash.com/photo-1568901346375-23c9450c583b?w=400&h=250&fit=crop',
      mediterranean: 'https://images.unsplash.com/photo-1540189549336-e6e99c6579bb?w=400&h=250&fit=crop',
      korean: 'https://images.unsplash.com/photo-1590301157899-4d168c8543b9?w=400&h=250&fit=crop',
      cafe: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085c?w=400&h=250&fit=crop',
      desserts: 'https://images.unsplash.com/photo-1551024506-0bccd828d423?w=400&h=250&fit=crop'
    }
    
    for (const c of cuisines) {
      const key = c.toLowerCase()
      if (cuisineImages[key]) return cuisineImages[key]
    }
    return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop'
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Restaurant Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImage(card.cuisines || [])}
          alt={card.restaurant_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
          #{card.rank}
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">{card.restaurant_name}</h3>
          {card.rating && (
            <div className="flex items-center space-x-1 bg-yellow-500/20 px-2 py-1 rounded-full">
              <span className="text-yellow-400 text-sm">⭐</span>
              <span className="text-yellow-400 text-sm font-medium">{card.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Cuisines */}
        {card.cuisines && card.cuisines.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {card.cuisines.map((cuisine: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
              >
                {cuisine}
              </span>
            ))}
          </div>
        )}

        {/* Cost */}
        {card.cost && (
          <div className="mb-3">
            <span className="text-green-400 font-medium">💰 ₹{card.cost.toFixed(0)} for two</span>
          </div>
        )}

        {/* AI Explanation */}
        {card.explanation && (
          <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm">
              <span className="font-medium">🤖 AI Insight:</span> {card.explanation}
            </p>
          </div>
        )}

        {/* Action Button */}
        <button className="w-full py-2 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200">
          View Details
        </button>
      </div>
    </div>
  )
}
