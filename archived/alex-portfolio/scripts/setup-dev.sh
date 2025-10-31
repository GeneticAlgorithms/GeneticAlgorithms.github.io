#!/bin/bash

# Alex Portfolio Development Setup Script
# This script sets up the development environment for the portfolio and API

set -e  # Exit on any error

echo "🛠️  Setting up Alex Portfolio Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "portfolio/index.html" ]; then
    print_error "Please run this script from the alex-portfolio directory"
    exit 1
fi

# Setup Portfolio Development
print_status "Setting up portfolio development environment..."

cd portfolio

# Create local development server
if command -v python3 &> /dev/null; then
    print_status "Starting portfolio development server..."
    print_status "Portfolio will be available at: http://localhost:8000"
    print_status "Press Ctrl+C to stop the server"
    python3 -m http.server 8000 &
    PORTFOLIO_PID=$!
    print_success "Portfolio development server started (PID: $PORTFOLIO_PID)"
else
    print_warning "Python3 not found. Please start a local server manually."
fi

cd ..

# Setup API Development
print_status "Setting up API development environment..."

cd emporia-api

# Check if Python is available
if command -v python3 &> /dev/null; then
    print_status "Installing API dependencies..."
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        print_status "Creating virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    print_status "Activating virtual environment..."
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing Python dependencies..."
    pip install -r requirements.txt
    
    print_success "API dependencies installed"
    
    # Check for environment variables
    if [ ! -f ".env" ]; then
        print_warning "No .env file found. Creating template..."
        cat > .env << EOF
# Azure Document Intelligence Configuration
AZURE_DI_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
AZURE_DI_KEY=your-azure-key-here

# Optional Configuration
MAX_CONCURRENCY=8
REQUEST_TIMEOUT_SECONDS=160
MODEL_ID=prebuilt-layout
EOF
        print_warning "Please update .env file with your Azure credentials"
    fi
    
    print_status "Starting API development server..."
    print_status "API will be available at: http://localhost:8001"
    print_status "API docs at: http://localhost:8001/docs"
    print_status "Press Ctrl+C to stop the server"
    
    # Start API server
    uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload &
    API_PID=$!
    print_success "API development server started (PID: $API_PID)"
    
else
    print_error "Python3 not found. Please install Python 3.11+ to run the API"
fi

cd ..

# Create development configuration
print_status "Creating development configuration..."

cat > dev-config.json << EOF
{
  "portfolio": {
    "url": "http://localhost:8000",
    "status": "running"
  },
  "api": {
    "url": "http://localhost:8001",
    "docs": "http://localhost:8001/docs",
    "health": "http://localhost:8001/healthz",
    "status": "running"
  },
  "development": {
    "portfolio_pid": $PORTFOLIO_PID,
    "api_pid": $API_PID,
    "started_at": "$(date)"
  }
}
EOF

print_success "Development configuration created: dev-config.json"

# Create cleanup script
print_status "Creating cleanup script..."

cat > scripts/stop-dev.sh << 'EOF'
#!/bin/bash

echo "🛑 Stopping development servers..."

# Stop portfolio server
if [ -f "dev-config.json" ]; then
    PORTFOLIO_PID=$(jq -r '.development.portfolio_pid' dev-config.json)
    if [ "$PORTFOLIO_PID" != "null" ] && [ "$PORTFOLIO_PID" != "" ]; then
        kill $PORTFOLIO_PID 2>/dev/null || true
        echo "✅ Portfolio server stopped"
    fi
    
    API_PID=$(jq -r '.development.api_pid' dev-config.json)
    if [ "$API_PID" != "null" ] && [ "$API_PID" != "" ]; then
        kill $API_PID 2>/dev/null || true
        echo "✅ API server stopped"
    fi
fi

# Clean up
rm -f dev-config.json

echo "🎉 Development servers stopped"
EOF

chmod +x scripts/stop-dev.sh

print_success "Cleanup script created: scripts/stop-dev.sh"

echo ""
print_success "🎉 Development environment setup complete!"
echo ""
echo "📋 Development URLs:"
echo "  • Portfolio: http://localhost:8000"
echo "  • API: http://localhost:8001"
echo "  • API Docs: http://localhost:8001/docs"
echo "  • API Health: http://localhost:8001/healthz"
echo ""
echo "🛠️  Available Commands:"
echo "  • Stop servers: ./scripts/stop-dev.sh"
echo "  • Deploy: ./scripts/deploy.sh"
echo "  • View logs: Check terminal output"
echo ""
echo "📝 Next Steps:"
echo "  1. Update .env file with Azure credentials"
echo "  2. Test portfolio at http://localhost:8000"
echo "  3. Test API at http://localhost:8001/docs"
echo "  4. Make your changes and test locally"
echo ""
print_warning "Remember to stop servers with ./scripts/stop-dev.sh when done"
