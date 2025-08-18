# Landora - Land Registry Frontend

A modern land registry management system built with Next.js 15, Material-UI, and TypeScript. This application provides comprehensive land registration, verification, and management capabilities for both citizens and government officials.

## 🚀 Features

- **User Dashboard**: Property registration, viewing, and management
- **Admin Panel**: Verification queue, property search, and officer management  
- **Public Verification**: Verify property ownership without login
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Material-UI**: Modern, accessible interface components
- **TypeScript Support**: Type-safe development
- **Server-Side Rendering**: Next.js App Router for optimal performance

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/              # User dashboard routes  
│   │   ├── dashboard/page.tsx
│   │   ├── register/page.tsx
│   │   ├── properties/page.tsx
│   │   ├── property/[id]/page.tsx
│   │   ├── transfer/[id]/page.tsx
│   │   ├── transactions/page.tsx
│   │   ├── help/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── verify/page.tsx
│   │   └── layout.tsx
│   ├── (admin)/                  # Admin panel routes
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── verification-queue/page.tsx
│   │       ├── property-search/page.tsx
│   │       ├── officers/page.tsx
│   │       └── layout.tsx
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   └── common/
│       ├── NextLayout.tsx        # User dashboard layout
│       ├── NextAdminLayout.tsx   # Admin panel layout
│       ├── NextProtectedRoute.tsx # Route protection
│       ├── FileUpload.jsx        # File upload component
│       └── LoadingSpinner.jsx    # Loading indicator
├── src/                          # Source components
│   ├── pages/                    # Page components
│   └── assets/                   # Static assets
├── data/                         # JSON data files
├── public/                       # Static files
├── theme.js                      # Material-UI theme
├── next.config.js                # Next.js configuration  
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Landora-FE

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production  
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔐 Authentication

The application includes mock authentication with different user roles:

- **Citizens**: Can register properties, view their properties, transfer ownership
- **Admins**: Can verify registrations, search all properties, manage officers
- **Public**: Can verify property ownership without authentication

## 🏗️ Architecture

- **Framework**: Next.js 15 with App Router
- **Styling**: Material-UI + Emotion
- **State Management**: React Query for server state
- **Forms**: React Hook Form with Yup validation
- **File Upload**: React Dropzone
- **Notifications**: Notistack
- **Icons**: Material-UI Icons + Lucide React

## 🌟 Key Components

### User Dashboard
- Property registration with document upload
- Property portfolio view and management
- Property transfer workflow
- Transaction history
- Public verification tool

### Admin Panel  
- Pending registrations verification queue
- Comprehensive property search
- Officer management system
- System analytics and reporting

### Shared Features
- Responsive navigation with route-based highlighting
- Protected routes with role-based access control
- Loading states and error handling
- Mobile-optimized interface

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px) 
- Mobile (320px - 767px)

## 🚢 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

Create a `.env.local` file for environment-specific configurations:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for efficient land registry management
