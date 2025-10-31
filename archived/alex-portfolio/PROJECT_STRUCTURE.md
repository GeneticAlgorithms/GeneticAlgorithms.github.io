# Alex Portfolio - Project Structure

## 📁 Complete Directory Tree

```
alex-portfolio/
├── README.md                          # Main project documentation
├── PROJECT_STRUCTURE.md               # This file
├── portfolio/                         # Main portfolio website
│   ├── index.html                     # Main portfolio page
│   ├── css/                          # Stylesheets
│   │   ├── style.css                 # Main portfolio styles (embedded)
│   │   └── emporia-style.css         # EmporiaPDF page styles
│   ├── js/                           # JavaScript files
│   │   ├── app.js                    # Main portfolio JavaScript (embedded)
│   │   └── emporia-app.js            # EmporiaPDF page JavaScript
│   ├── images/                       # Images and assets
│   │   ├── 1734419007212.jpg         # Profile photo
│   │   └── AlexLeResume.pdf          # Resume PDF
│   └── pages/                        # Individual pages
│       ├── emporia.html              # EmporiaPDF demo page
│       ├── blog-predictive-analytics.html
│       ├── blog-automated-systems.html
│       └── blog-nasa-silicon-valley.html
├── emporia-api/                      # PDF Processing API
│   ├── app/                          # FastAPI application
│   │   ├── __init__.py
│   │   ├── main.py                   # Main FastAPI app
│   │   ├── config.py                 # Configuration management
│   │   ├── di_client.py              # Azure Document Intelligence client
│   │   └── markdown_utils.py         # Markdown processing utilities
│   ├── static/                       # Static files for API
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── app.js
│   ├── templates/                    # HTML templates
│   │   └── index.html
│   ├── tests/                        # Test files
│   │   ├── demo_client.py
│   │   └── pdfs/                     # Test PDF files
│   ├── site/                         # Original site files
│   │   ├── index.html
│   │   ├── css/style.css
│   │   └── js/app.js
│   ├── requirements.txt              # Python dependencies
│   ├── Procfile                      # Render deployment config
│   ├── runtime.txt                   # Python version
│   ├── start.sh                      # Startup script
│   ├── README.md                     # API documentation
│   ├── DEPLOYMENT.md                 # Deployment guide
│   └── DEPLOYMENT_ALTERNATIVES.md    # Alternative deployment options
├── documentation/                    # Comprehensive documentation
│   ├── api/                          # API documentation
│   │   └── README.md                 # API endpoints and usage
│   ├── deployment/                   # Deployment guides
│   │   └── README.md                 # Deployment instructions
│   └── user-guides/                  # User guides
│       └── portfolio-guide.md        # Portfolio user guide
├── assets/                           # Shared assets
└── scripts/                          # Utility scripts
    ├── deploy.sh                     # Deployment script
    └── setup-dev.sh                  # Development setup script
```

## 🎯 Key Features

### Portfolio Website
- **Modern Design**: Responsive, dark theme with 3D background
- **Interactive Elements**: Three.js particle system, custom cursor
- **Real-time Data**: Market ticker, weather, news
- **Project Showcase**: Live demos and project cards
- **Blog Integration**: Writing section with full articles

### EmporiaPDF API
- **Multi-PDF Processing**: 1-15 PDFs simultaneously
- **Azure Integration**: Document Intelligence for text extraction
- **FastAPI Backend**: Modern async Python web framework
- **Live Deployment**: Production-ready on Render.com
- **Comprehensive Testing**: Unit, integration, and load tests

## 🚀 Quick Start

### Development Setup
```bash
cd alex-portfolio
./scripts/setup-dev.sh
```

### Deployment
```bash
cd alex-portfolio
./scripts/deploy.sh
```

### Manual Development
```bash
# Portfolio
cd portfolio
python3 -m http.server 8000

# API
cd emporia-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 📊 File Organization

### Portfolio Files
- **HTML**: Single-page application with embedded CSS/JS
- **Images**: Profile photos, resume, project assets
- **Pages**: Individual blog posts and project pages
- **Styles**: Separate CSS files for different components

### API Files
- **Python**: Modular FastAPI application structure
- **Templates**: HTML templates for web interface
- **Static**: CSS/JS for API web interface
- **Tests**: Comprehensive test suite
- **Config**: Environment and deployment configuration

### Documentation
- **API Docs**: Complete endpoint documentation
- **Deployment**: Step-by-step deployment guides
- **User Guides**: Portfolio and API usage instructions
- **Technical**: Architecture and implementation details

## 🔧 Maintenance

### Regular Tasks
- Update dependencies
- Monitor API performance
- Review and update documentation
- Test all functionality
- Backup important files

### Development Workflow
1. Make changes locally
2. Test with development servers
3. Commit changes to git
4. Deploy using scripts
5. Verify production functionality

## 📈 Performance

### Portfolio
- **Load Time**: < 3 seconds
- **Responsive**: All device sizes
- **Accessibility**: WCAG compliant
- **SEO**: Optimized meta tags

### API
- **Response Time**: < 5 seconds
- **Processing**: < 3 minutes for 10-15 PDFs
- **Uptime**: 99.9%
- **Concurrency**: 8 simultaneous requests

## 🛡️ Security

### Portfolio
- HTTPS encryption
- No sensitive data storage
- Regular security updates
- Input validation

### API
- Environment variable protection
- Input validation and sanitization
- Error handling without data exposure
- Rate limiting and monitoring

## 📞 Support

- **Portfolio**: https://geneticalgorithms.github.io
- **API**: https://emporia-pdf-api.onrender.com
- **Documentation**: ./documentation/
- **GitHub**: https://github.com/GeneticAlgorithms

---

**Last Updated**: October 28, 2025  
**Version**: 1.0.0  
**Author**: Alexander Le
