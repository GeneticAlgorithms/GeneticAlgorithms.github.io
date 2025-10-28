# EmporiaPDF Deployment Alternatives

## 🚀 **Option 1: Render.com (RECOMMENDED)**

### Steps:
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New Web Service"
4. Connect your `EmporiaPDF` repository
5. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add Environment Variables:
   ```
AZURE_DI_ENDPOINT=https://your-azure-endpoint.cognitiveservices.azure.com/
AZURE_DI_KEY=your-azure-key-here
   MAX_CONCURRENCY=8
   REQUEST_TIMEOUT_SECONDS=160
   MODEL_ID=prebuilt-layout
   ```

## 🐍 **Option 2: PythonAnywhere**

### Steps:
1. Go to [pythonanywhere.com](https://pythonanywhere.com)
2. Sign up for free account
3. Upload your code via Git or file upload
4. Install dependencies in Bash console:
   ```bash
   pip3.10 install --user -r requirements.txt
   ```
5. Create web app:
   - Go to "Web" tab
   - Click "Add a new web app"
   - Choose "Manual configuration"
   - Select Python 3.10
6. Configure WSGI file to point to your FastAPI app
7. Add environment variables in web app settings

## ☁️ **Option 3: Heroku**

### Steps:
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create emporia-pdf-api`
4. Set environment variables:
   ```bash
heroku config:set AZURE_DI_ENDPOINT=https://your-azure-endpoint.cognitiveservices.azure.com/
heroku config:set AZURE_DI_KEY=your-azure-key-here
   heroku config:set MAX_CONCURRENCY=8
   heroku config:set REQUEST_TIMEOUT_SECONDS=160
   heroku config:set MODEL_ID=prebuilt-layout
   ```
5. Deploy: `git push heroku main`

## 🔧 **Option 4: Local Testing**

If deployment is taking too long, we can test locally:

```bash
cd /Users/alex1602e19/Desktop/Alex_Portfolio_sites/EmporiaPDF
python3 -m pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Then visit: http://localhost:8000

## 📋 **Environment Variables Needed**

All platforms need these environment variables:
- `AZURE_DI_ENDPOINT=https://your-azure-endpoint.cognitiveservices.azure.com/`
- `AZURE_DI_KEY=your-azure-key-here`
- `MAX_CONCURRENCY=8`
- `REQUEST_TIMEOUT_SECONDS=160`
- `MODEL_ID=prebuilt-layout`

## 🎯 **Next Steps**

1. Choose a platform (Render.com is easiest)
2. Deploy your API
3. Get the deployment URL
4. I'll update the frontend to use your real API
5. Test with actual PDFs!
