#!/usr/bin/env python3
"""
Test script for Emporia Multi-PDF Processing API
Tests the live API endpoint with sample data
"""

import requests
import json
import time
from pathlib import Path

# API Configuration
API_BASE = "https://emporia-pdf-api.onrender.com"
HEALTH_ENDPOINT = f"{API_BASE}/healthz"
PROCESS_ENDPOINT = f"{API_BASE}/process-pdfs"

def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(HEALTH_ENDPOINT, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_api_docs():
    """Test the API documentation endpoint"""
    print("📚 Testing API documentation...")
    try:
        response = requests.get(f"{API_BASE}/docs", timeout=10)
        if response.status_code == 200:
            print("✅ API documentation accessible")
            return True
        else:
            print(f"❌ API docs failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ API docs error: {e}")
        return False

def test_web_interface():
    """Test the web interface"""
    print("🌐 Testing web interface...")
    try:
        response = requests.get(API_BASE, timeout=10)
        if response.status_code == 200 and "Emporia PDF" in response.text:
            print("✅ Web interface accessible")
            return True
        else:
            print(f"❌ Web interface failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Web interface error: {e}")
        return False

def create_sample_pdf():
    """Create a simple sample PDF for testing"""
    try:
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import letter
        
        filename = "sample_test.pdf"
        c = canvas.Canvas(filename, pagesize=letter)
        
        # Add some content
        c.drawString(100, 750, "Sample Test Document")
        c.drawString(100, 700, "This is a test PDF for the Emporia API")
        c.drawString(100, 650, "Created for demonstration purposes")
        c.drawString(100, 600, "Contains sample text for processing")
        
        c.save()
        print(f"✅ Created sample PDF: {filename}")
        return filename
    except ImportError:
        print("⚠️  reportlab not available, skipping PDF creation")
        return None
    except Exception as e:
        print(f"❌ PDF creation error: {e}")
        return None

def test_pdf_processing():
    """Test PDF processing with sample files"""
    print("📄 Testing PDF processing...")
    
    # Create sample PDFs
    sample_files = []
    for i in range(3):  # Create 3 sample PDFs
        filename = create_sample_pdf()
        if filename:
            sample_files.append(filename)
    
    if not sample_files:
        print("⚠️  No sample PDFs available, skipping processing test")
        return False
    
    try:
        # Prepare the request
        files = [('files', open(f, 'rb')) for f in sample_files]
        data = {
            'message': 'Test processing of sample documents',
            'chatid': 'test123',
            'userid': 'demo'
        }
        
        print(f"📤 Sending {len(sample_files)} files to API...")
        start_time = time.time()
        
        response = requests.post(
            PROCESS_ENDPOINT,
            files=files,
            data=data,
            timeout=300  # 5 minute timeout
        )
        
        end_time = time.time()
        processing_time = end_time - start_time
        
        # Close files
        for _, file_obj in files:
            file_obj.close()
        
        if response.status_code == 200:
            print(f"✅ PDF processing successful!")
            print(f"⏱️  Processing time: {processing_time:.2f} seconds")
            print(f"📄 Response length: {len(response.text)} characters")
            
            # Show first 500 characters of response
            preview = response.text[:500]
            print(f"📋 Response preview:\n{preview}...")
            
            return True
        else:
            print(f"❌ PDF processing failed: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ PDF processing error: {e}")
        return False
    finally:
        # Clean up sample files
        for filename in sample_files:
            try:
                Path(filename).unlink()
            except:
                pass

def main():
    """Run all tests"""
    print("🚀 Starting Emporia API Tests")
    print("=" * 50)
    
    tests = [
        ("Health Check", test_health_check),
        ("API Documentation", test_api_docs),
        ("Web Interface", test_web_interface),
        ("PDF Processing", test_pdf_processing)
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n🧪 Running: {test_name}")
        result = test_func()
        results.append((test_name, result))
        print("-" * 30)
    
    # Summary
    print("\n📊 Test Results Summary:")
    print("=" * 50)
    passed = 0
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\n🎯 Overall: {passed}/{len(results)} tests passed")
    
    if passed == len(results):
        print("🎉 All tests passed! API is ready for demo.")
    else:
        print("⚠️  Some tests failed. Check the output above.")

if __name__ == "__main__":
    main()
