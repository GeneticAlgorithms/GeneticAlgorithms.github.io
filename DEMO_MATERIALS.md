# Emporia Multi-PDF Processing API - Demo Materials

## 🎯 **Live Demo URLs**

### **Main Application**
- **Live API**: https://emporia-pdf-api.onrender.com/
- **Portfolio Integration**: https://geneticalgorithms.github.io/emporia.html
- **API Documentation**: https://emporia-pdf-api.onrender.com/docs

### **Health Check**
- **Status Endpoint**: https://emporia-pdf-api.onrender.com/healthz
- **Response**: `{"status":"ok"}`

## 🧪 **Testing Instructions**

### **1. Web Interface Testing**
1. Visit: https://emporia-pdf-api.onrender.com/
2. Upload 10-15 PDF files (max 20MB each)
3. Enter a processing message
4. Click "Process PDFs"
5. Wait for Azure Document Intelligence to process
6. Download the consolidated markdown output

### **2. API Endpoint Testing**

#### **Health Check**
```bash
curl -X GET "https://emporia-pdf-api.onrender.com/healthz"
```

#### **Process PDFs (cURL)**
```bash
curl -X POST "https://emporia-pdf-api.onrender.com/process-pdfs" \
  -F "files=@document1.pdf" \
  -F "files=@document2.pdf" \
  -F "files=@document3.pdf" \
  -F "message=Extract key information from these documents" \
  -F "chatid=demo123" \
  -F "userid=alex"
```

#### **Process PDFs (Python)**
```python
import requests

url = "https://emporia-pdf-api.onrender.com/process-pdfs"
files = [
    ('files', open('document1.pdf', 'rb')),
    ('files', open('document2.pdf', 'rb')),
    ('files', open('document3.pdf', 'rb'))
]
data = {
    'message': 'Extract key information from these documents',
    'chatid': 'demo123',
    'userid': 'alex'
}

response = requests.post(url, files=files, data=data)
markdown_output = response.text
print(markdown_output)
```

## 📊 **Performance Metrics**

### **Expected Performance**
- **Processing Time**: < 3 minutes for 10-15 PDFs
- **Concurrency**: Up to 8 simultaneous PDFs
- **File Size Limit**: 20MB per PDF
- **Total Files**: 10-15 PDFs per request

### **Azure Document Intelligence**
- **Model**: prebuilt-layout
- **Region**: eastus2
- **Timeout**: 160 seconds per request
- **Max Concurrency**: 8 simultaneous requests

## 🔧 **Technical Specifications**

### **Backend Stack**
- **Framework**: FastAPI 0.115.2
- **Python**: 3.11.6
- **Azure SDK**: azure-ai-documentintelligence 1.0.0b4
- **Deployment**: Render.com
- **Runtime**: Uvicorn with 4 workers

### **API Endpoints**
- `GET /` - Web interface
- `GET /healthz` - Health check
- `POST /process-pdfs` - Main processing endpoint
- `GET /docs` - API documentation

### **Request Format**
- **Content-Type**: multipart/form-data
- **Required Fields**: files (array of PDFs)
- **Optional Fields**: message, chatid, userid

### **Response Format**
- **Content-Type**: text/plain
- **Format**: Consolidated markdown
- **Structure**: Organized by document with extracted content

## 🎬 **Demo Script**

### **1. Introduction (30 seconds)**
"Today I'll demonstrate the Emporia Multi-PDF Processing API, a FastAPI application that processes multiple PDFs simultaneously using Azure Document Intelligence."

### **2. Live Demo (2-3 minutes)**
1. **Show the web interface** at https://emporia-pdf-api.onrender.com/
2. **Upload 10-15 PDF files** (prepare sample PDFs in advance)
3. **Enter processing message**: "Extract key information and summarize findings"
4. **Click Process PDFs** and show the loading state
5. **Wait for processing** (explain Azure Document Intelligence is working)
6. **Show results** - consolidated markdown output
7. **Download the results** to demonstrate functionality

### **3. Technical Overview (1 minute)**
- **Backend**: FastAPI with Azure Document Intelligence
- **Concurrency**: Up to 8 simultaneous PDFs
- **Performance**: Sub-3-minute processing for 10-15 files
- **Output**: Consolidated markdown with extracted content

### **4. API Testing (1 minute)**
- **Show health check**: `curl https://emporia-pdf-api.onrender.com/healthz`
- **Show API docs**: https://emporia-pdf-api.onrender.com/docs
- **Demonstrate cURL command** for programmatic access

## 📋 **Test Cases**

### **Valid Test Cases**
1. **10 PDFs** (minimum requirement)
2. **15 PDFs** (maximum requirement)
3. **Mixed file sizes** (1MB to 20MB)
4. **Different document types** (reports, invoices, contracts)
5. **With processing message**
6. **With chatid and userid**

### **Error Test Cases**
1. **Too few files** (< 10) - Should show error
2. **Too many files** (> 15) - Should show error
3. **File too large** (> 20MB) - Should show error
4. **Non-PDF files** - Should be rejected
5. **Empty request** - Should show error

## 🎯 **Success Criteria**

### **Functional Requirements**
- ✅ Processes 10-15 PDFs simultaneously
- ✅ Handles files up to 20MB each
- ✅ Completes processing in under 3 minutes
- ✅ Returns consolidated markdown output
- ✅ Provides error handling and validation

### **Technical Requirements**
- ✅ FastAPI framework implementation
- ✅ Azure Document Intelligence integration
- ✅ AsyncIO concurrency control
- ✅ Multipart form data handling
- ✅ Live deployment on cloud platform

## 📝 **Sample Test PDFs**

### **Recommended Test Documents**
1. **Technical Reports** (5-10 pages each)
2. **Financial Documents** (invoices, statements)
3. **Legal Documents** (contracts, agreements)
4. **Research Papers** (academic articles)
5. **Business Documents** (presentations, proposals)

### **File Preparation**
- Ensure PDFs are readable (not scanned images)
- Mix of text-heavy and table-heavy documents
- Various page counts (2-20 pages)
- Different languages (if applicable)

## 🚀 **Deployment Information**

### **Production URLs**
- **API**: https://emporia-pdf-api.onrender.com/
- **GitHub**: https://github.com/GeneticAlgorithms/emporia-pdf-api
- **Portfolio**: https://geneticalgorithms.github.io

### **Environment Variables**
- `AZURE_DI_ENDPOINT`: https://emporiapdf1.cognitiveservices.azure.com/
- `AZURE_DI_KEY`: [Configured]
- `MAX_CONCURRENCY`: 8
- `REQUEST_TIMEOUT_SECONDS`: 160
- `MODEL_ID`: prebuilt-layout

---

**Ready for live demonstration!** 🎉
