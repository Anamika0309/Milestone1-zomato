from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import os
import requests
import json
from datetime import datetime

# Initialize FastAPI app
app = FastAPI(
    title="Crave AI Backend API",
    description="Smart restaurant recommendations powered by AI",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Preference(BaseModel):
    location: str
    budget: str
    cuisines: List[str]
    min_rating: Optional[float] = 4.0
    additional_notes: Optional[str] = None

class RecommendationCard(BaseModel):
    rank: int
    restaurant_name: str
    cuisines: List[str]
    rating: Optional[float]
    cost: Optional[float]
    explanation: Optional[str]

class RecommendationResponse(BaseModel):
    headline: str
    message: Optional[str]
    cards: List[RecommendationCard]
    telemetry: Optional[Dict[str, Any]] = None

# Sample data
LOCATIONS = [
    "Brookefield",
    "Koramangala 3Rd Block", 
    "Indiranagar",
    "Whitefield",
    "HSR Layout",
    "Jayanagar",
    "BTM Layout",
    "Marathahalli"
]

SAMPLE_RESTAURANTS = [
    {
        "name": "Paradise Biryani",
        "cuisines": ["Biryani", "Mughlai", "North Indian"],
        "rating": 4.5,
        "cost": 600,
        "location": "Brookefield"
    },
    {
        "name": "Toit",
        "cuisines": ["Pizza", "Italian", "American"],
        "rating": 4.3,
        "cost": 800,
        "location": "Indiranagar"
    },
    {
        "name": "Chutney Chang",
        "cuisines": ["Chinese", "Thai", "Asian"],
        "rating": 4.1,
        "cost": 500,
        "location": "Koramangala 3Rd Block"
    },
    {
        "name": "Barbeque Nation",
        "cuisines": ["BBQ", "North Indian", "Mughlai"],
        "rating": 4.4,
        "cost": 900,
        "location": "Whitefield"
    },
    {
        "name": "Cafe Coffee Day",
        "cuisines": ["Cafe", "Coffee", "Snacks"],
        "rating": 3.8,
        "cost": 300,
        "location": "HSR Layout"
    }
]

# API Routes
@app.get("/")
async def root():
    return {"message": "Crave AI Backend API is running"}

@app.get("/api/v1/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

@app.get("/api/v1/locations")
async def get_locations():
    """Get available locations"""
    return LOCATIONS

@app.post("/api/v1/recommendations")
async def get_recommendations(preference: Preference):
    """Get restaurant recommendations based on preferences"""
    try:
        # Filter restaurants by location and preferences
        filtered_restaurants = []
        for restaurant in SAMPLE_RESTAURANTS:
            if restaurant["location"] == preference.location:
                # Check cuisines match
                cuisine_match = any(cuisine in restaurant["cuisines"] for cuisine in preference.cuisines)
                if cuisine_match:
                    # Check rating
                    if restaurant["rating"] >= preference.min_rating:
                        # Check budget
                        if preference.budget == "low" and restaurant["cost"] <= 300:
                            filtered_restaurants.append(restaurant)
                        elif preference.budget == "medium" and 300 < restaurant["cost"] <= 700:
                            filtered_restaurants.append(restaurant)
                        elif preference.budget == "high" and restaurant["cost"] > 700:
                            filtered_restaurants.append(restaurant)
        
        # Create recommendation cards
        cards = []
        for i, restaurant in enumerate(filtered_restaurants[:5], 1):
            explanation = f"Great choice for {preference.location}! This restaurant offers excellent {', '.join(restaurant['cuisines'][:2])} with a rating of {restaurant['rating']}."
            
            card = RecommendationCard(
                rank=i,
                restaurant_name=restaurant["name"],
                cuisines=restaurant["cuisines"],
                rating=restaurant["rating"],
                cost=restaurant["cost"],
                explanation=explanation
            )
            cards.append(card)
        
        # Create response
        response = RecommendationResponse(
            headline="Your Personalised Picks",
            message=f"Based on your preferences for {preference.location}, we found {len(cards)} great restaurants for you!",
            cards=cards,
            telemetry={
                "model": "crave-ai-v1.0",
                "candidate_count": len(SAMPLE_RESTAURANTS),
                "recommendation_count": len(cards),
                "latency_ms": 150
            }
        )
        
        return response
        
    except Exception as e:
        return {"error": str(e), "message": "Failed to get recommendations"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
