# HealthyLife Blog

A modern, responsive health and wellness blog built with Next.js, featuring a beautiful UI with dark mode support, interactive animations, and a rich content management system.

![HealthyLife Blog](https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg)

## Features

- 🎨 **Modern UI/UX**
  - Responsive design that works on all devices
  - Beautiful animations using Framer Motion
  - Dark/Light mode toggle
  - Custom toast notifications
  - Interactive modals and transitions

- 📱 **Rich Blog Features**
  - Article categories and tags
  - Search functionality
  - Category filtering
  - Like/Share/Comment system
  - View count tracking
  - Author information
  - Rich text content support

- 💻 **Technical Features**
  - Server-side rendering with Next.js
  - TypeScript for type safety
  - Framer Motion for animations
  - Custom theming system
  - Responsive image handling with fallbacks
  - Efficient state management with React hooks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthylife.git
cd healthylife
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
HealthyLife/
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout component
│   ├── page.tsx         # Main blog component
│   └── globals.css      # Global styles
├── public/              # Static assets
├── next.config.ts       # Next.js configuration
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## Key Components

- **Blog Posts**: Displays a grid of blog posts with images, titles, excerpts, and engagement metrics
- **Post Details**: Modal view for full post content with comments
- **Create Post**: Form to add new blog posts
- **FAQ Section**: Expandable FAQ items
- **Search & Filter**: Search posts by content and filter by category
- **Theme Toggle**: Switch between light and dark modes
- **Toast Notifications**: Show feedback for user actions

## Customization

### Theming

The project uses a custom theming system defined in the `theme` object. You can modify colors and other visual properties in the theme configuration:

```typescript
const theme = {
  light: {
    bg: "#f8fffe",
    cardBg: "#ffffff",
    // ... other light theme properties
  },
  dark: {
    bg: "#0f1b0f",
    cardBg: "#1a2e1a",
    // ... other dark theme properties
  }
}
```

### Adding Categories

Add new categories in the `categories` array:

```typescript
const categories = ["All", "Nutrition", "Mental Health", "Wellness", "Fitness"]
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
