# Emporia Multi-PDF Processing API

A FastAPI endpoint that processes multiple PDFs simultaneously using Azure Document Intelligence.

## Features

- Process 10-15 PDFs simultaneously
- Azure Document Intelligence integration
- Drag-and-drop web interface
- Real-time processing with concurrency control
- Consolidated markdown output
- Handles up to 20MB per PDF
- Sub-3-minute processing time

## Setup

### 1. Environment Variables

Create a `.env` file with your Azure credentials:

```bash
AZURE_DI_ENDPOINT=https://your-azure-endpoint.cognitiveservices.azure.com/
AZURE_DI_KEY=your-azure-key-here
MAX_CONCURRENCY=8
REQUEST_TIMEOUT_SECONDS=160
MODEL_ID=prebuilt-layout
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run Locally

```bash
uvicorn app.main:app --reload
```

Visit: http://localhost:8000

## API Endpoints

- `POST /process-pdfs` - Process multiple PDFs
- `GET /` - Web interface
- `GET /docs` - API documentation
- `GET /healthz` - Health check

## Deployment

This API is designed to be deployed on platforms like Render, Heroku, or PythonAnywhere. Set the environment variables in your deployment platform's dashboard.

## Tech Stack

- FastAPI
- Azure Document Intelligence
- Python 3.10+
- AsyncIO
- Pydantic