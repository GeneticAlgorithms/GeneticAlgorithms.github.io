# EmporiaPDF API Documentation

## Overview

The Emporia Multi-PDF Processing API is a FastAPI-based service that processes multiple PDF documents simultaneously using Azure Document Intelligence.

## Base URL

- **Production**: https://emporia-pdf-api.onrender.com
- **Documentation**: https://emporia-pdf-api.onrender.com/docs

## Endpoints

### Health Check
- **GET** `/healthz`
- **Description**: Check API health status
- **Response**: `{"status": "ok"}`

### Process PDFs
- **POST** `/process-pdfs`
- **Description**: Process multiple PDF files
- **Content-Type**: `multipart/form-data`

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `files` | File[] | Yes | 1-15 PDF files (max 20MB each) |
| `message` | String | Yes | Processing instructions |
| `chatid` | String | No | Optional chat identifier |
| `userid` | String | No | Optional user identifier |

#### Response

- **Content-Type**: `text/plain`
- **Format**: Consolidated markdown document
- **Processing Time**: < 3 minutes for 10-15 PDFs

#### Example Request

```bash
curl -X POST "https://emporia-pdf-api.onrender.com/process-pdfs" \
  -F "files=@document1.pdf" \
  -F "files=@document2.pdf" \
  -F "message=Extract key information" \
  -F "chatid=demo123" \
  -F "userid=alex"
```

#### Example Response

```markdown
# Document Processing Results

**Processing Message:** Extract key information
**Files Processed:** 2
**Processing Time:** 45.2s

## Document 1: document1.pdf
[Extracted content...]

## Document 2: document2.pdf
[Extracted content...]
```

## Error Handling

### Common Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| 400 | Bad Request | Check file count (1-15) and file types |
| 413 | Payload Too Large | Reduce file sizes (max 20MB each) |
| 500 | Internal Server Error | Check API status or try again |

### Error Response Format

```json
{
  "detail": "Error description"
}
```

## Rate Limits

- **Concurrent Requests**: Up to 8 simultaneous PDFs
- **File Size**: 20MB per PDF maximum
- **Processing Time**: 3 minutes maximum per request

## Authentication

Currently no authentication required. All endpoints are publicly accessible.

## Support

For issues or questions, contact:
- **Portfolio**: https://geneticalgorithms.github.io
- **GitHub**: https://github.com/GeneticAlgorithms/emporia-pdf-api
