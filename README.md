# José María Chico López - Portfolio

A modern, interactive portfolio website built with React, TypeScript, and Vite. Features a technology timeline, experience charts, and an interactive Galaga game.

## 🚀 Features

- **Interactive Technology Timeline**: Visual timeline showing technology experience over time
- **Experience Charts**: Bar charts displaying accumulated experience in different technologies
- **Interactive Galaga Game**: A fun space shooter game built with HTML5 Canvas
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Beautiful dark theme with custom color scheme
- **Modern UI Components**: Built with Radix UI and custom components

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Carousel**: Embla Carousel

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Radix UI based)
│   ├── figma/        # Figma-specific components
│   ├── TechnologyTimeline.tsx
│   ├── ExperienceChart.tsx
│   ├── JobModal.tsx
│   └── GalagaGame.tsx
├── data/
│   └── portfolio-data.ts  # Portfolio data and configurations
├── styles/
│   └── globals.css        # Global styles and Tailwind imports
├── App.tsx               # Main application component
└── main.tsx             # Application entry point
```

### Key Components

- **TechnologyTimeline**: Interactive timeline showing technology experience
- **ExperienceChart**: Bar charts for technology experience visualization
- **JobModal**: Modal component for displaying job details
- **GalagaGame**: Interactive space shooter game
- **UI Components**: Comprehensive set of reusable UI components

## 🎨 Customization

### Colors and Theme

The project uses a custom dark theme with the following color palette:
- Primary: Red (#ef4444)
- Secondary: Gray (#1f2937)
- Accent: Purple (#7c3aed)
- Background: Black (#000000)

### Adding New Technologies

To add new technologies to the timeline:

1. Edit `src/data/portfolio-data.ts`
2. Add the technology to the `technologies` array
3. Include it in the relevant job's `technologies` array

### Modifying Job Data

Update the `jobs` array in `src/data/portfolio-data.ts` to modify job information.

## 🎮 Galaga Game

The portfolio includes an interactive Galaga-style game built with HTML5 Canvas:

- **Controls**: Mouse movement and left-click to shoot
- **Objective**: Defeat all enemies to win
- **Scoring**: Different points for different enemy types
- **Features**: Particle effects, sound-like visual feedback, and smooth animations

## 📱 Responsive Design

The portfolio is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

The project is configured for easy deployment:

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist/` directory

3. Deploy the contents of `dist/` to your hosting provider

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: clz.chema@gmail.com
- **LinkedIn**: [José María Chico López](https://www.linkedin.com/in/chema-cl/)
- **GitHub**: [@chemacl](https://github.com/chemacl)
- **Dev.to**: [@chemacl](https://dev.to/chemacl)

---

Built with ❤️ and lots of ☕ 