# Computer Science Student Portfolio

A modern, responsive portfolio website designed for computer science students to showcase their projects, skills, and experience.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Smooth scrolling, hover effects, and scroll animations
- **Contact Form**: Functional contact form with validation
- **Project Showcase**: Detailed project cards with technologies and links
- **Skills Section**: Organized display of programming languages and tools
- **Education Timeline**: Professional timeline layout for academic and work experience
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Performance Optimized**: Fast loading with minimal dependencies

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

##  Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone or download** this repository to your local machine

2. **Navigate** to the project directory:
   ```bash
   cd portfolio
   ```

3. **Open** the `index.html` file in your web browser:
   - Double-click the file, or
   - Right-click → "Open with" → Your preferred browser

### Alternative: Using a Local Server

For better development experience, you can use a local server:

#### Using Python (if installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (if installed):
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server
```

#### Using Live Server (VS Code extension):
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

Then open your browser and go to `http://localhost:8000` (or the port shown in terminal).

##  Customization

### Personal Information

1. **Open `index.html`**
2. **Update the following sections:**

#### Hero Section:
```html
<h1 class="hero-title">
    Hi, I'm <span class="highlight">Your Name</span>
</h1>
<h2 class="hero-subtitle">Your Title</h2>
<p class="hero-description">
    Your personal description...
</p>
```

#### About Section:
```html
<p>Your about text...</p>
```

#### Contact Information:
```html
<span>your.email@example.com</span>
<span>+1 (555) 123-4567</span>
<span>Your City, State</span>
```

### Projects

1. **Find the projects section** in `index.html`
2. **Replace the sample projects** with your own:

```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-your-icon"></i>
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Project description...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology</span>
        </div>
        <div class="project-links">
            <a href="your-github-link" class="project-link">
                <i class="fab fa-github"></i> Code
            </a>
            <a href="your-live-link" class="project-link">
                <i class="fas fa-external-link-alt"></i> Live
            </a>
        </div>
    </div>
</div>
```

### Skills

1. **Update the skills section** with your technologies:

```html
<div class="skill-item">
    <i class="fab fa-your-icon"></i>
    <span>Your Skill</span>
</div>
```

### Education & Experience

1. **Replace the timeline items** with your information:

```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <h3>Your Degree/Position</h3>
        <h4>Institution/Company</h4>
        <p class="timeline-date">Date Range</p>
        <p>Description...</p>
    </div>
</div>
```

### Social Media Links

1. **Update all social media links** throughout the file:
   - Replace `#` with your actual profile URLs
   - Update the icons if needed

### Colors & Styling

1. **Open `styles.css`**
2. **Update the color scheme** by changing these CSS variables:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #fbbf24;
    --text-color: #333;
    --background-color: #ffffff;
}
```

## 📱 Responsive Design

The portfolio is fully responsive and includes:

- **Mobile-first approach**
- **Flexible grid layouts**
- **Touch-friendly navigation**
- **Optimized typography**
- **Adaptive images and spacing**

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

##  Performance

- **Minimal dependencies** (only Font Awesome and Google Fonts)
- **Optimized CSS** with efficient selectors
- **Lazy loading** for animations
- **Compressed assets** for faster loading

##  Deployment

### GitHub Pages

1. **Create a GitHub repository**
2. **Upload your files**
3. **Go to Settings → Pages**
4. **Select source branch** (usually `main`)
5. **Your site will be available** at `https://yourusername.github.io/repository-name`

### Netlify

1. **Drag and drop** your project folder to [Netlify](https://netlify.com)
2. **Your site will be deployed** automatically
3. **Custom domain** can be added in settings

### Vercel

1. **Connect your GitHub repository** to [Vercel](https://vercel.com)
2. **Deploy** with one click
3. **Automatic updates** on every push

## 🔧 Development

### Adding New Sections

1. **Add HTML structure** in `index.html`
2. **Add corresponding CSS** in `styles.css`
3. **Add JavaScript functionality** in `script.js` if needed
4. **Update navigation** menu

### Adding Animations

1. **Add CSS animations** in `styles.css`
2. **Use JavaScript** to trigger animations on scroll
3. **Test performance** on different devices

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Submit a pull request**

## 📞 Support

If you have any questions or need help customizing the portfolio:

1. **Check the documentation** above
2. **Open an issue** on GitHub
3. **Contact** the developer

## 🎉 Acknowledgments

- **Font Awesome** for the amazing icons
- **Google Fonts** for the Inter font family
- **Modern CSS** techniques and best practices
- **Responsive design** principles

---

**Happy coding! 🚀**

*Remember to replace all placeholder content with your actual information before deploying.*

