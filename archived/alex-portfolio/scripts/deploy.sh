#!/bin/bash

# Alex Portfolio Deployment Script
# This script deploys the portfolio and API to their respective platforms

set -e  # Exit on any error

echo "🚀 Starting Alex Portfolio Deployment..."

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

# Deploy Portfolio to GitHub Pages
print_status "Deploying portfolio to GitHub Pages..."

cd portfolio
if [ -d ".git" ]; then
    print_status "Updating existing repository..."
    git add .
    git commit -m "Update portfolio: $(date)" || print_warning "No changes to commit"
    git push origin main
    print_success "Portfolio deployed to GitHub Pages"
else
    print_warning "Portfolio directory is not a git repository"
    print_status "Please initialize git repository and connect to GitHub Pages"
fi

cd ..

# Deploy API to Render.com
print_status "Deploying API to Render.com..."

cd emporia-api
if [ -d ".git" ]; then
    print_status "Updating API repository..."
    git add .
    git commit -m "Update API: $(date)" || print_warning "No changes to commit"
    git push origin main
    print_success "API deployed to Render.com"
else
    print_warning "API directory is not a git repository"
    print_status "Please initialize git repository and connect to Render.com"
fi

cd ..

# Run tests
print_status "Running tests..."

# Test portfolio
if [ -f "portfolio/index.html" ]; then
    print_success "Portfolio files found"
else
    print_error "Portfolio files missing"
fi

# Test API health
print_status "Testing API health..."
if curl -s https://emporia-pdf-api.onrender.com/healthz > /dev/null; then
    print_success "API is responding"
else
    print_warning "API health check failed"
fi

# Generate deployment report
print_status "Generating deployment report..."

cat > deployment-report.md << EOF
# Deployment Report

**Date**: $(date)
**Status**: Completed

## Portfolio
- **URL**: https://geneticalgorithms.github.io
- **Status**: $(if [ -f "portfolio/index.html" ]; then echo "✅ Ready"; else echo "❌ Missing files"; fi)

## API
- **URL**: https://emporia-pdf-api.onrender.com
- **Health**: $(if curl -s https://emporia-pdf-api.onrender.com/healthz > /dev/null; then echo "✅ Healthy"; else echo "❌ Unhealthy"; fi)

## Files Deployed
- Portfolio: $(find portfolio -name "*.html" -o -name "*.css" -o -name "*.js" | wc -l) files
- API: $(find emporia-api -name "*.py" | wc -l) Python files

## Next Steps
1. Verify portfolio at https://geneticalgorithms.github.io
2. Test API at https://emporia-pdf-api.onrender.com/docs
3. Monitor logs for any issues
EOF

print_success "Deployment report generated: deployment-report.md"

echo ""
print_success "🎉 Deployment completed!"
echo ""
echo "📋 Summary:"
echo "  • Portfolio: https://geneticalgorithms.github.io"
echo "  • API: https://emporia-pdf-api.onrender.com"
echo "  • Documentation: ./documentation/"
echo ""
echo "📊 Check deployment-report.md for details"
