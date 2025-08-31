# 🏡 Landora - Modern Land Registry System

A modern, responsive land registry system built with Next.js, featuring advanced UI components, glassmorphism design, and comprehensive property management capabilities.

## ✨ Recent UI Improvements

### 🎨 Modern Design System

- **Glassmorphism Effects**: All dialogs and components now feature subtle transparency with blur effects
- **Enhanced Backdrop**: Strong background blur (12px-16px) with animated particles
- **Responsive Design**: Automatic fullscreen on mobile, proper sizing on tablets/desktop
- **Modern Animations**: Smooth transitions, hover effects, and micro-interactions

### 🖥️ New Components

- **ModernDialog**: Enhanced dialogs with glassmorphism and backdrop blur
- **ModernNotification**: Toast system with progress indicators
- **ModernMenu**: Dropdown menus with blur effects
- **ModernLoadingOverlay**: Animated loading states with particles
- **ResponsiveLayout**: Utilities for responsive design

### 📱 Enhanced Responsiveness

- **Mobile-First Design**: All components start with mobile optimization
- **Touch-Friendly**: Adequate touch targets and gesture support
- **Adaptive Layouts**: Components that automatically adjust to screen size
- **Progressive Enhancement**: Features add complexity on larger screens

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Landora-FE

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Demo Page

Visit [http://localhost:3000/modern-ui-demo](http://localhost:3000/modern-ui-demo) to see all the modern UI components in action.

## 📁 Project Structure

```
├── components/
│   ├── common/           # Reusable common components
│   ├── layouts/          # Layout components
│   └── ui/              # Modern UI components
│       ├── ModernDialog.jsx
│       ├── ModernNotification.jsx
│       ├── ModernMenu.jsx
│       ├── ModernLoadingOverlay.jsx
│       └── ResponsiveLayout.jsx
├── contexts/            # React contexts
├── lib/                # Utility libraries
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   ├── citizen/       # Citizen dashboard
│   └── officer/       # Officer dashboard
├── public/            # Static assets
└── styles/           # Global styles
```

## 🎯 Features

### 🏢 For Citizens

- **Property Registration**: Register new properties with document upload
- **Property Management**: View and manage owned properties
- **Transfer Requests**: Initiate property transfers
- **Transaction History**: Track all property-related transactions
- **Document Verification**: Verify property documents publicly

### 👨‍💼 For Officers

- **Verification Queue**: Review and approve property registrations
- **User Management**: Manage citizen and officer accounts
- **Property Oversight**: Monitor all properties in the system
- **Report Generation**: Generate various administrative reports
- **Document Review**: Review submitted documents with PDF viewer

### 🔧 For Administrators

- **System Management**: Full system administration capabilities
- **User Roles**: Manage user roles and permissions
- **Analytics**: System usage and performance analytics
- **Settings**: Configure system-wide settings

## 🎨 UI Components Guide

### ModernDialog Usage

```jsx
import ModernDialog from "@/components/ui/ModernDialog";

<ModernDialog
  open={isOpen}
  onClose={handleClose}
  title="Dialog Title"
  size="large" // small, medium, large, fullscreen
  variant="glass" // glass, gradient, neon, solid
  transition="zoom" // zoom, slide, fade
  actions={
    <>
      <Button onClick={handleClose}>Cancel</Button>
      <ModernButton variant="gradient">Save</ModernButton>
    </>
  }
>
  <YourContent />
</ModernDialog>;
```

### Modern Notifications

```jsx
import { useToast } from "@/components/ui/ModernNotification";

const { toast } = useToast();

toast.success("Success message", {
  title: "Operation Complete",
  duration: 5000,
  showProgress: true,
});
```

### Responsive Layout

```jsx
import { useResponsiveLayout } from "@/components/ui/ResponsiveLayout";

const { isMobile, isTablet, spacing } = useResponsiveLayout();
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Material-UI v5, Emotion
- **State Management**: React Context
- **Authentication**: JWT-based auth
- **Notifications**: Notistack
- **File Upload**: Cloudinary integration
- **PDF Viewing**: Custom PDF viewer
- **Animations**: Framer Motion, CSS-in-JS

## 🎨 Design System

### Color Palette

- **Primary**: Blue gradient (#3b82f6 to #1e40af)
- **Secondary**: Purple accent (#8b5cf6)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Warning**: Orange (#f59e0b)
- **Info**: Cyan (#06b6d4)

### Typography

- **Headers**: Geist font family
- **Body**: System font stack
- **Responsive**: Auto-scaling based on screen size

### Effects

- **Glassmorphism**: Background blur with transparency
- **Animations**: Smooth transitions and micro-interactions
- **Hover Effects**: Enhanced feedback on interactive elements

## 📱 Browser Support

### Modern Features

- **Backdrop Filter**: Chrome 76+, Safari 9+, Firefox 103+
- **CSS Grid**: All modern browsers
- **CSS Custom Properties**: All modern browsers

### Fallbacks

- Graceful degradation for older browsers
- Alternative layouts for unsupported features

## 🚀 Performance

### Optimization

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js image optimization
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Proper caching strategies

### Metrics

- **Lighthouse Score**: 90+ across all categories
- **Core Web Vitals**: Optimized for Google's metrics
- **Mobile Performance**: Optimized for mobile devices

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📚 Documentation

- [Modern UI Improvements Guide](./MODERN_UI_IMPROVEMENTS.md)
- [Component API Documentation](./docs/components.md)
- [Responsive Design Guide](./docs/responsive.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the demo page for component usage examples

---

Built with ❤️ using modern web technologies for the future of land registry systems.
