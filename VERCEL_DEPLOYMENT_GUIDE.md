# Vercel Deployment Guide - Crave AI Frontend

## 🚀 Deployment Plan: Render + Vercel

**Backend:** Render (FastAPI) - https://crave-ai-backend.onrender.com
**Frontend:** Vercel (Next.js) - Your Vercel URL

## 📋 Step-by-Step Vercel Deployment

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub repositories

### Step 2: Import GitHub Repository
1. After signing in, click "Add New..." → "Project"
2. Search for: `Milestone1-zomato`
3. Select: `Anamika0309/Milestone1-zomato`
4. Click "Import"

### Step 3: Configure Project Settings
Vercel will automatically detect your Next.js app:

**Auto-detected Settings:**
- **Framework:** Next.js
- **Root Directory:** `web/`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### Step 4: Environment Variables
Add these environment variables:

```
NEXT_PUBLIC_API_BASE_URL = https://crave-ai-backend.onrender.com
```

**Note:** `NEXT_PUBLIC_` prefix makes it available in browser

### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Your frontend will be available at: `https://your-project-name.vercel.app`

## 🔧 Configuration Files

### vercel.json (Already Configured)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "web/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://crave-ai-backend.onrender.com/api/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "https://crave-ai-backend.onrender.com"
  }
}
```

### Next.js API Integration
The frontend will automatically proxy API calls to your Render backend.

## 🧪 Testing After Deployment

### Test Frontend
1. Open your Vercel URL
2. Navigate to homepage
3. Test preference form
4. Submit preferences
5. Verify recommendations display

### Test API Integration
```javascript
// Test API from browser console
fetch('/api/v1/health')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 📊 Expected Results

After successful deployment:

- **Frontend URL:** `https://your-project-name.vercel.app`
- **API Integration:** All API calls work seamlessly
- **UI:** Full Next.js app with dark/light theme
- **Functionality:** Complete restaurant recommendation flow

## 🎯 Complete Deployment Flow

1. ✅ **Backend Deployed:** Render (crave-ai-backend.onrender.com)
2. 🔄 **Deploy Frontend:** Vercel (your-project-name.vercel.app)
3. 🧪 **Test Integration:** Verify API connectivity
4. 🚀 **Go Live:** Full application deployed

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check `web/package.json` exists
   - Verify `web/next.config.js` is correct
   - Check dependencies in `web/package-lock.json`

2. **API Errors:**
   - Ensure backend is deployed to Render
   - Verify `NEXT_PUBLIC_API_BASE_URL` is set
   - Check CORS settings on backend

3. **Blank Page:**
   - Check build logs in Vercel dashboard
   - Verify Next.js routing
   - Check environment variables

4. **API 404 Errors:**
   - Verify API routes in vercel.json
   - Check backend URL is correct
   - Test backend endpoints directly

## 📞 Support Resources

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Docs:** https://vercel.com/docs
- **Project Logs:** Dashboard → Your Project → Logs
- **Environment Variables:** Dashboard → Your Project → Settings → Environment Variables

## 🎉 Success Criteria

- [ ] Frontend loads without errors
- [ ] API integration works
- [ ] All UI components render correctly
- [ ] Form submissions work
- [ ] Recommendations display properly
- [ ] Dark/light theme toggle works
- [ ] Mobile responsive design works

---

**Ready for Vercel deployment!** Your Next.js frontend is configured to work seamlessly with the Render backend.
