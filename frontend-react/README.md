# NexusLearn React Application

This is the React version of the NexusLearn Student Tools Platform.

## Features

- 🎨 **Modern React** with Vite build tool
- 🌊 **Animated LineWaves** background effect
- ✨ **Shiny text** animations
- 🎯 **Full authentication** with email verification
- 📄 **AI Resume Analysis**
- ⏳ **Digital Time Capsules**
- 🎭 **Framer Motion** animations
- 📱 **Responsive design**

## Project Structure

```
frontend-react/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   └── LineWaves.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ResumeUpload.jsx
│   │   ├── ResumeResult.jsx
│   │   ├── CapsuleDashboard.jsx
│   │   ├── CapsuleCreate.jsx
│   │   └── CapsuleView.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── App.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- Backend server running on port 8000

### Installation

1. Navigate to the React project directory:
```bash
cd frontend-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The React app connects to the FastAPI backend at `http://localhost:8000/api`.

## Key Components

### LineWaves Background
Animated wave background effect using HTML5 Canvas.

### AuthContext
Global authentication state management with:
- Login/Logout
- Email verification
- Google OAuth
- Protected routes

### Pages
- **Home** - Landing page with features showcase
- **Login/Signup** - Authentication with email verification
- **Dashboard** - User stats and quick actions
- **ResumeUpload** - File upload with drag-and-drop
- **ResumeResult** - AI analysis results display
- **CapsuleDashboard** - Time capsules management
- **CapsuleCreate** - Create new time capsules
- **CapsuleView** - View unlocked capsules

## Design System

- **Primary Color**: #6B21FF (Purple)
- **Background**: #0A0812 (Dark)
- **Font**: Plus Jakarta Sans
- **Border Radius**: 16px (cards), 12px (buttons)
- **Animations**: 0.3s ease transitions

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

All rights reserved. Developed by Dev Khanapue (@isthisdev).
