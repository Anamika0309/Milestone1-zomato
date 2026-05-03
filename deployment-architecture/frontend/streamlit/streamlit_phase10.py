import streamlit as st
import requests
import json
from typing import List, Dict, Any, Optional
import os
import sys

# Configure Streamlit page
st.set_page_config(
    page_title="Crave AI - Smart Restaurant Recommendations",
    page_icon="🍽️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# API configuration
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")

def load_locations() -> List[str]:
    """Load available locations from API"""
    try:
        response = requests.get(f"{API_BASE_URL}/api/v1/locations", timeout=10)
        if response.status_code == 200:
            return response.json()
        else:
            st.error(f"Failed to load locations: {response.status_code}")
            return ["Brookefield", "Koramangala 3Rd Block", "Indiranagar"]
    except requests.exceptions.RequestException as e:
        st.error(f"Error connecting to API: {str(e)}")
        return ["Brookefield", "Koramangala 3Rd Block", "Indiranagar"]

def get_recommendations(preferences: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Get restaurant recommendations from API"""
    try:
        response = requests.post(
            f"{API_BASE_URL}/api/v1/recommendations",
            json={"preference": preferences},
            timeout=30
        )
        if response.status_code == 200:
            return response.json()
        else:
            st.error(f"API Error: {response.status_code} - {response.text}")
            return None
    except requests.exceptions.Timeout:
        st.error("Request timed out. Please try again.")
        return None
    except requests.exceptions.RequestException as e:
        st.error(f"Error getting recommendations: {str(e)}")
        return None

def display_recommendations(response_data: Dict[str, Any]):
    """Display restaurant recommendations in a clean format"""
    if not response_data or "cards" not in response_data:
        st.error("No recommendations received")
        return
    
    # Display headline
    st.markdown(f"## {response_data.get('headline', 'Your Restaurant Recommendations')}")
    
    if response_data.get('message'):
        st.info(response_data['message'])
    
    # Display restaurant cards
    for card in response_data['cards']:
        with st.container():
            # Restaurant header
            col1, col2 = st.columns([4, 1])
            with col1:
                st.markdown(f"### #{card['rank']} {card['restaurant_name']}")
            with col2:
                if card.get('rating'):
                    st.markdown(f"**⭐ {card['rating']:.1f}**")
            
            # Cuisine tags
            if card.get('cuisines'):
                cuisine_tags = ", ".join(card['cuisines'])
                st.markdown(f"**Cuisines:** {cuisine_tags}")
            
            # Cost display
            if card.get('cost'):
                st.markdown(f"**💰 Cost:** ₹{card['cost']:.0f} for two")
            
            # AI explanation
            if card.get('explanation'):
                st.markdown(f"🤖 **AI Insight:** {card['explanation']}")
            
            st.markdown("---")

def main():
    """Main Streamlit app for Phase 10 deployment"""
    
    # App header
    st.title("🍽️ Crave AI - Smart Restaurant Recommendations")
    st.markdown("Let our AI sommelier curate the perfect dining experience based on your preferences!")
    
    # Sidebar for preferences as per Phase 10 requirements
    st.sidebar.header("🎯 Your Preferences")
    
    # Load locations
    locations = load_locations()
    
    # Location selection
    location = st.sidebar.selectbox(
        "📍 Select Your Area",
        options=locations if locations else ["Brookefield"],
        index=0 if locations else 0,
        help="Choose the neighborhood where you want to dine"
    )
    
    # Budget selection
    budget_options = {
        "low": "💰 Budget-friendly (Under ₹300)",
        "medium": "💰💰 Moderate (₹300-700)", 
        "high": "💰💰💰 Premium (Above ₹700)"
    }
    budget = st.sidebar.selectbox(
        "💸 Budget Range",
        options=list(budget_options.keys()),
        format_func=lambda x: budget_options[x],
        index=1,
        help="Select your budget range for two people"
    )
    
    # Cuisine selection
    available_cuisines = [
        "Italian", "Chinese", "Indian", "Mexican", "Japanese", "Thai",
        "French", "American", "Mediterranean", "Korean", "Cafe", "Desserts",
        "North Indian", "South Indian", "Pizza", "Bakery", "Seafood", "Biryani"
    ]
    selected_cuisines = st.sidebar.multiselect(
        "🍽️ Preferred Cuisines",
        options=available_cuisines,
        default=["Indian"],
        help="Select all cuisines you're interested in"
    )
    
    # Minimum rating slider
    min_rating = st.sidebar.slider(
        "⭐ Minimum Rating",
        min_value=1.0,
        max_value=5.0,
        value=4.0,
        step=0.5,
        help="Only show restaurants with this rating or higher"
    )
    
    # Additional notes text area
    additional_notes = st.sidebar.text_area(
        "💬 Special Requirements (Optional)",
        placeholder="e.g., 'romantic ambiance', 'outdoor seating', 'vegetarian options'...",
        help="Tell us about any specific preferences or requirements"
    )
    
    # Get recommendations button
    if st.sidebar.button("🚀 Get Recommendations", type="primary"):
        if not selected_cuisines:
            st.sidebar.error("Please select at least one cuisine")
            return
        
        # Show loading spinner
        with st.spinner("🤖 AI is analyzing restaurants for you..."):
            # Prepare preferences
            preferences = {
                "location": location,
                "budget": budget,
                "cuisines": selected_cuisines,
                "min_rating": min_rating,
                "additional_notes": additional_notes.strip() if additional_notes.strip() else None
            }
            
            # Get recommendations
            response = get_recommendations(preferences)
            
            if response:
                # Display recommendations
                display_recommendations(response)
    
    # Footer with deployment info
    st.markdown("---")
    st.markdown(
        "<div style='text-align: center; color: #666; margin-top: 2rem;'>"
        "🍽️ Crave AI - Phase 10 Streamlit Deployment | Powered by AI"
        "</div>", 
        unsafe_allow_html=True
    )

if __name__ == "__main__":
    main()
