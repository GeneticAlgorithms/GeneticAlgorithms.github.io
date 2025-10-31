# Deployment Guide

## EmporiaPDF API Deployment

### Prerequisites

- Python 3.11+
- Azure Document Intelligence account
- Render.com account (or alternative deployment platform)
- Git repository access

### Environment Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/GeneticAlgorithms/emporia-pdf-api.git
   cd emporia-pdf-api
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**
   ```bash
   export AZURE_DI_ENDPOINT="https://your-resource.cognitiveservices.azure.com/"
   export AZURE_DI_KEY="your-azure-key"
   export MAX_CONCURRENCY="8"
   export REQUEST_TIMEOUT_SECONDS="160"
   export MODEL_ID="prebuilt-layout"
   ```

### Render.com Deployment

1. **Connect Repository**
   - Go to [render.com](https://render.com)
   - Click "New Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - **Name**: `emporia-pdf-api`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

3. **Set Environment Variables**
   - `AZURE_DI_ENDPOINT`: Your Azure endpoint
   - `AZURE_DI_KEY`: Your Azure key
   - `MAX_CONCURRENCY`: 8
   - `REQUEST_TIMEOUT_SECONDS`: 160
   - `MODEL_ID`: prebuilt-layout

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Test the API at the provided URL

### Alternative Deployment Options

#### Heroku
```bash
# Install Heroku CLI
heroku create emporia-pdf-api
heroku config:set AZURE_DI_ENDPOINT="your-endpoint"
heroku config:set AZURE_DI_KEY="your-key"
git push heroku main
```

#### PythonAnywhere
1. Upload code via Git or file upload
2. Install dependencies in Bash console
3. Configure WSGI file
4. Set environment variables

#### Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Local Development

1. **Start Development Server**
   ```bash
   uvicorn app.main:app --reload
   ```

2. **Access Application**
   - API: http://localhost:8000
   - Docs: http://localhost:8000/docs
   - Health: http://localhost:8000/healthz

### Monitoring & Maintenance

#### Health Checks
- **Endpoint**: `/healthz`
- **Expected Response**: `{"status": "ok"}`
- **Monitoring**: Set up automated health checks

#### Logs
- **Render**: Available in dashboard
- **Local**: Check console output
- **Production**: Configure log aggregation

#### Performance Monitoring
- Monitor response times
- Track error rates
- Monitor Azure API usage
- Set up alerts for failures

### Troubleshooting

#### Common Issues

1. **500 Internal Server Error**
   - Check Azure credentials
   - Verify environment variables
   - Check logs for specific errors

2. **Timeout Errors**
   - Increase `REQUEST_TIMEOUT_SECONDS`
   - Reduce file sizes
   - Check Azure service status

3. **Memory Issues**
   - Reduce `MAX_CONCURRENCY`
   - Implement file streaming
   - Monitor memory usage

#### Debug Steps

1. Check health endpoint
2. Verify environment variables
3. Test with single PDF
4. Check Azure service status
5. Review application logs

### Security Considerations

- Store credentials in environment variables
- Use HTTPS in production
- Implement rate limiting
- Regular security updates
- Monitor for suspicious activity

### Scaling

#### Horizontal Scaling
- Deploy multiple instances
- Use load balancer
- Implement session management

#### Vertical Scaling
- Increase memory allocation
- Upgrade CPU resources
- Optimize code performance

### Backup & Recovery

- Regular code backups
- Environment variable backup
- Database backup (if applicable)
- Disaster recovery plan
