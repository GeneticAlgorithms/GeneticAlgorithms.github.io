#!/usr/bin/python3.10
import sys
import os

# Add your project directory to the Python path
project_dir = '/home/yourusername/EmporiaPDF'  # Replace 'yourusername' with your actual PythonAnywhere username
if project_dir not in sys.path:
    sys.path.insert(0, project_dir)

# Set environment variables
os.environ['AZURE_DI_ENDPOINT'] = 'https://your-azure-endpoint.cognitiveservices.azure.com/'
os.environ['AZURE_DI_KEY'] = 'your-azure-key-here'
os.environ['MAX_CONCURRENCY'] = '8'
os.environ['REQUEST_TIMEOUT_SECONDS'] = '160'
os.environ['MODEL_ID'] = 'prebuilt-layout'

# Import your FastAPI app
from app.main import app

# This is the WSGI application
application = app
