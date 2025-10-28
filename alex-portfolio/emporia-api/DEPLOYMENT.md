# EmporiaPDF Deployment Guide

## Azure Document Intelligence Setup

### 1. Create Azure Account
- Go to [portal.azure.com](https://portal.azure.com)
- Sign up for free Azure account ($200 credit included)

### 2. Create Document Intelligence Resource
1. Search for "Document Intelligence" in Azure Portal
2. Click "Create" → "Document Intelligence"
3. Fill in:
   - **Resource Group**: Create new (e.g., "emporia-pdf-rg")
   - **Region**: Choose closest to you
   - **Name**: "emporia-pdf-di"
   - **Pricing Tier**: F0 (Free tier - 500 transactions/month)
4. Click "Review + Create" → "Create"

### 3. Get Credentials
1. Go to your Document Intelligence resource
2. Click "Keys and Endpoint"
3. Copy:
   - **Key 1** (AZURE_DI_KEY)
   - **Endpoint** (AZURE_DI_ENDPOINT)

## Environment Variables

Create a `.env` file with:
```
AZURE_DI_ENDPOINT=https://your-resource-name.cognitiveservices.azure.com/
AZURE_DI_KEY=your-azure-key-here
MODEL_ID=prebuilt-layout
MAX_CONCURRENCY=8
REQUEST_TIMEOUT_SECONDS=160
```

## Deployment Options

### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Connect your repository
4. Add environment variables in Railway dashboard
5. Deploy automatically

### Option 2: Heroku
1. Install Heroku CLI
2. `heroku create emporia-pdf-api`
3. `heroku config:set AZURE_DI_ENDPOINT=your-endpoint`
4. `heroku config:set AZURE_DI_KEY=your-key`
5. `git push heroku main`

### Option 3: Local Testing
1. `pip install -r requirements.txt`
2. Create `.env` file with your credentials
3. `uvicorn app.main:app --reload`
4. Test at `http://localhost:8000`
