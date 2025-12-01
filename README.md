# Alexander Le - Portfolio Website

A modern, responsive portfolio website showcasing my work in data science, technology, and innovation. Built with vanilla HTML, CSS, and JavaScript, featuring interactive 3D animations and real-time market data.

🌐 **Live Site**: [geneticalgorithms.github.io](https://geneticalgorithms.github.io)

## About

I'm a junior at UC Berkeley pursuing a simultaneous degree in Statistics and Economics with a minor in Electrical Engineering & Computer Science, graduating May 2027. I've worked with California Volunteers, NASA, Intel, and competed in DoD cybersecurity challenges. Here I write about tech and create YouTube videos about STEM, finance, and philosophy!

## Features

- **Responsive Design**: Fully responsive layout that adapts to all screen sizes and devices
- **3D Animations**: Interactive Three.js animations for engaging visual experiences
- **Real-time Market Data**: Live securities tracker using yfinance API
- **Smooth Scrolling**: Seamless navigation between sections
- **Mobile Navigation**: Bottom navigation bar for mobile devices
- **Dark Theme**: Modern dark theme with cyan/blue accent colors
- **Performance Optimized**: Fast loading times and optimized assets

## Sections

- **Hero**: Introduction with social links and call-to-action
- **About**: Education, skills, interests, and awards
- **Experience**: Professional experience and internships
- **Writing**: Blog posts and articles
- **Videos**: Educational YouTube content
- **Projects**: Featured projects and technical work
- **Contact**: Contact information and social media links

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js
- **Icons**: Ion Icons
- **Fonts**: JetBrains Mono (monospace)
- **APIs**: 
  - yfinance for market data
  - YouTube API for video embeds

## Project Structure

```
.
├── index.html          # Main HTML file
├── assets/             # Images and media files
├── blogs/             # Blog post HTML files
├── fonts/             # Custom font files
├── projects/          # Project showcase files
├── scripts/           # JavaScript utilities
└── archived/          # Previous versions

```

## Getting Started

### Prerequisites

No build tools or dependencies required! This is a static website that can be opened directly in a browser.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GeneticAlgorithms/geneticalgorithms.github.io.git
cd geneticalgorithms.github.io
```

2. Open `index.html` in your web browser, or serve it using a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

## Customization

### Updating Content

- Edit `index.html` to update text, links, and sections
- Modify CSS variables in the `:root` selector to change colors and spacing
- Add new sections by following the existing HTML structure

### Adding Projects

Add new project cards in the Projects section:
```html
<div class="project-card fade-in">
    <h3>Project Title</h3>
    <p>Project description...</p>
    <div class="tech-stack">
        <span class="tech-tag">Technology</span>
    </div>
</div>
```

### Changing Colors

Update CSS custom properties in `index.html`:
```css
:root {
    --primary-blue: #00d4ff;
    --secondary-teal: #00b4d8;
    --bg-dark: #0a0a0a;
    /* ... */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images and assets
- Lazy loading for better performance
- Minimal external dependencies
- Efficient CSS with custom properties

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Website**: [geneticalgorithms.github.io](https://geneticalgorithms.github.io)
- **YouTube**: [@genetic.algorithms](https://www.youtube.com/@genetic.algorithms)
- **LinkedIn**: [alex-le-berkeley](https://www.linkedin.com/in/alex-le-berkeley/)
- **GitHub**: [@GeneticAlgorithms](https://github.com/GeneticAlgorithms)

## Acknowledgments

- Three.js for 3D graphics capabilities
- Ion Icons for beautiful iconography
- Google Fonts for typography
- yfinance for market data integration

---

Built with ❤️ by Alexander Le

