# Render Deployment Steps - Crave AI Backend

## 🔧 Issue Resolution

The issue you encountered was that Render couldn't find the proper file structure. I've fixed this by:

1. Creating `app.py` at the repository root level
2. Updating `requirements.txt` with FastAPI dependencies
3. Updating `render.yaml` with correct paths
4. Setting proper environment variables

## 📋 Step-by-Step Render Deployment

### Step 1: Create Render Account
1. Go to https://render.com
2. Click "Sign Up"
3. Choose "Sign up with GitHub"
4. Authorize Render to access your GitHub repositories

### Step 2: Create New Web Service
1. After signing in, click "New +" in the top right
2. Select "Web Service"
3. Click "Connect a repository"

### Step 3: Connect GitHub Repository
1. Search for: `Milestone1-zomato`
2. Select the repository: `Anamika0309/Milestone1-zomato`
3. Click "Connect"

### Step 4: Configure Service
Render will automatically detect the `render.yaml` file. The configuration will be:

**Service Details:**
- **Name:** crave-ai-backend
- **Environment:** Python
- **Plan:** Free
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn app:app --host 0.0.0.0 --port $PORT`
- **Health Check Path:** `/api/v1/health`

### Step 5: Set Environment Variables
1. Scroll down to "Environment Variables"
2. Add these variables:

```
GROQ_API_KEY = your_groq_api_key_here
PYTHON_VERSION = 3.11
CORS_ORIGIN = *
PYTHONPATH = /app
```

**Important:** Get your Groq API key from https://console.groq.com/

### Step 6: Deploy
1. Click "Create Web Service"
2. Wait for the build to complete (2-3 minutes)
3. Your API will be available at: `https://crave-ai-backend.onrender.com`

### Step 7: Test the API
Test these endpoints:

```bash
# Health Check
curl https://crave-ai-backend.onrender.com/api/v1/health

# Get Locations
curl https://crave-ai-backend.onrender.com/api/v1/locations

# Test Recommendations
curl -X POST https://crave-ai-backend.onrender.com/api/v1/recommendations \
  -H "Content-Type: application/json" \
  -d '{"preference":{"location":"Brookefield","budget":"medium","cuisines":["Indian"]}}'
```

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check that `requirements.txt` is at repository root
   - Verify `app.py` is at repository root
   - Check render.yaml syntax

2. **API Key Error:**
   - Ensure `GROQ_API_KEY` is set correctly
   - Verify key is valid and active

3. **CORS Error:**
   - Ensure `CORS_ORIGIN=*` is set
   - Check frontend is calling correct URL

4. **Health Check Fails:**
   - Verify health check path: `/api/v1/health`
   - Check app is running on correct port

## 📊 Expected Results

After successful deployment:

- **Health Check:** Returns `{"status": "ok", "timestamp": "...", "version": "1.0.0"}`
- **Locations:** Returns list of available locations
- **Recommendations:** Returns personalized restaurant recommendations

## 🎯 Next Steps

1. Deploy backend to Render using these steps
2. Copy the Render API URL
3. Deploy frontend to Streamlit Cloud
4. Set `API_BASE_URL` in Streamlit Cloud to your Render URL

## 📞 Support

If you encounter issues:
1. Check Render logs: Dashboard → Your Service → Logs
2. Verify environment variables are set correctly
3. Ensure all files are at repository root level

---

**Repository Structure for Render:**
```
Milestone1-zomato/
├── app.py                    # FastAPI application
├── requirements.txt          # Python dependencies
├── render.yaml              # Render configuration
└── deployment-architecture/  # Additional configs (optional)
```
