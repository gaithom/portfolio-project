# Michael Gaitho Portfolio

A modern, responsive portfolio website built with React, featuring multiple theme layouts, smooth animations, and developer mode.

## Features

- **4 Unique Theme Layouts**: Forest (organic), Midnight (editorial), Void (brutalist), Light (minimal)
- **Advanced Animations**: GSAP-powered scroll triggers, parallax effects, and micro-interactions
- **Developer Mode**: Performance monitoring, animation debugging, and component inspection
- **Responsive Design**: Mobile-first approach with flawless cross-browser compatibility
- **Interactive Elements**: Project modals, dynamic testimonials, and contact form
- **Custom Components**: Particle canvas, custom cursor, skill bars, and more

## Tech Stack

- **Frontend**: React 18, JavaScript ES6+
- **Animations**: GSAP 3.12.5 with ScrollTrigger
- **Styling**: CSS-in-JS with dynamic theming
- **Fonts**: Google Fonts (Syne, Space Mono, DM Sans)
- **Build Tool**: Create React App

## Project Structure

```
portfolio-project/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Shared.js          # Reusable components
│   │   └── DeveloperMode.js    # Dev mode components
│   ├── data/
│   │   ├── themes.js          # Theme configurations
│   │   ├── content.js         # Projects, skills, testimonials
│   │   └── sectionMeta.js     # Developer mode metadata
│   ├── hooks/
│   │   └── useGSAP.js         # GSAP loading and utilities
│   ├── layouts/
│   │   ├── ForestLayout.js    # Organic theme layout
│   │   ├── MidnightLayout.js  # Editorial theme layout
│   │   ├── VoidLayout.js      # Brutalist theme layout
│   │   └── LightLayout.js     # Minimal theme layout
│   ├── App.js                 # Main application component
│   └── index.js               # React DOM entry point
├── package.json
└── README.md
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/michaelgaitho/portfolio.git
   cd portfolio-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Theme System

The portfolio features four distinct theme layouts, each with unique characteristics:

### 🌿 Forest Theme
- Organic, asymmetric design
- Nature-inspired animations
- Curved elements and flowing transitions

### 🌙 Midnight Theme  
- Editorial, magazine-style layout
- Wide typography and sophisticated spacing
- Professional and refined aesthetic

### 🌑 Void Theme
- Brutalist, bold design
- Raw, unstyled elements
- High contrast and geometric shapes

### ☀️ Light Theme
- Minimal, Swiss grid layout
- Clean typography and generous whitespace
- Airy and approachable design

## Developer Mode

Activate developer mode (bottom-right toggle) to access:
- **Performance Monitor**: FPS tracking, frame times, memory usage
- **Animation Debug Band**: Real-time GSAP animation status
- **Component Inspector**: Hover sections to view component details
- **Grid Overlay**: Toggle layout grid for alignment verification

## Performance Optimizations

- GSAP animations with hardware acceleration
- Intersection Observer for lazy loading
- Optimized re-renders with React hooks
- Efficient state management
- Minimal bundle size with strategic imports

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment

The app is optimized for deployment to platforms like:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Michael Gaitho  
📍 Nakuru, Kenya  
🌐 [michaelgaitho.com](https://michaelgaitho.com)  
✉️ hello@michaelgaitho.com

---

Built with ❤️ using React, GSAP, and modern web technologies.
