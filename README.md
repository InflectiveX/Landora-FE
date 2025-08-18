# Landora - Sri Lankan Land Registry System

A modern blockchain-based land registry system built with Next.js, React, and Material-UI for the Government of Sri Lanka.

![Landora Dashboard](./public/dashboard-preview.png)

## 🌟 Features

### Core Functionality
- **Property Registration**: Complete property registration with blockchain integration
- **Property Verification**: Public verification system for property authenticity
- **Transaction History**: Comprehensive blockchain transaction tracking
- **Document Management**: Secure document upload with IPFS storage
- **User Management**: Role-based access control (Citizens, Administrators)

### User Features
- **Dashboard**: Personalized dashboard with property overview and statistics
- **Property Management**: Register, view, and manage properties
- **Public Verification**: Verify any property using Property ID or Transaction Hash
- **Transaction Tracking**: Real-time blockchain transaction monitoring
- **Profile Management**: Complete user profile and settings management
- **Help & Support**: Comprehensive FAQ and contact support

### Admin Features
- **Verification Queue**: Review and approve property registrations
- **User Management**: Manage citizens and verify accounts
- **System Analytics**: View system statistics and reports
- **Blockchain Monitoring**: Monitor blockchain network health

### Technical Features
- **Blockchain Integration**: Ethereum-based property registration
- **IPFS Storage**: Decentralized document storage
- **Responsive Design**: Mobile-first responsive interface
- **Real-time Updates**: Live transaction and verification updates
- **Secure Authentication**: JWT-based authentication system

## 🛠 Technology Stack

### Frontend
- **Next.js 15** - React framework with SSR/SSG
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Material-UI v7** - Modern React component library
- **React Hook Form** - Form handling with validation
- **TanStack Query** - Server state management
- **Notistack** - Notification system
- **React Dropzone** - File upload handling

### Blockchain & Storage
- **Ethers.js** - Ethereum blockchain interaction
- **IPFS** - Decentralized file storage
- **Web3 Integration** - Blockchain connectivity

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Next.js API Routes** - Backend API development

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Landora-FE.git
   cd Landora-FE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   NEXT_PUBLIC_BLOCKCHAIN_NETWORK=mumbai
   NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### For Citizens

1. **Registration**
   - Sign up with your email and personal details
   - Verify your account through email confirmation

2. **Property Registration**
   - Navigate to "Register Property"
   - Fill in property details, owner information
   - Upload required documents (Title Deed, Survey Plan, etc.)
   - Submit for blockchain registration

3. **Property Verification**
   - Use the "Public Verification" tool
   - Enter Property ID or Transaction Hash
   - View complete property information and blockchain proof

4. **Dashboard Management**
   - View your properties and transactions
   - Track verification status
   - Manage your profile and settings

### For Administrators

1. **Admin Dashboard**
   - Access comprehensive system overview
   - Monitor system health and statistics

2. **Verification Queue**
   - Review pending property registrations
   - Verify submitted documents
   - Approve or reject registrations

3. **User Management**
   - Manage citizen accounts
   - Handle verification requests
   - Monitor system usage

## 🏗 Project Structure

```
Landora-FE/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Authentication pages
│   └── ...
├── components/            # React components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
├── styles/               # Global styles
├── public/               # Static assets
└── ...
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Register new property
- `GET /api/properties/[id]` - Get property details

### Transactions
- `GET /api/transactions` - Get transaction history
- `POST /api/transactions` - Create new transaction

### Verification
- `POST /api/verify` - Verify property by ID or hash

## 🎨 Design System

### Color Palette
- **Primary**: #1F3A93 (Government Blue)
- **Secondary**: #17A589 (Teal)
- **Success**: #27AE60 (Green)
- **Warning**: #F39C12 (Orange)
- **Error**: #E74C3C (Red)

### Typography
- **Headings**: Roboto, Bold
- **Body**: Roboto, Regular
- **Code**: Monaco, Monospace

## 🧪 Testing

### Demo Accounts
**Admin Account:**
- Email: admin@demo.com
- Password: password

**Citizen Account:**
- Email: user@demo.com  
- Password: password

### Sample Data
**Property ID for Verification:** `PROP001`
**Transaction Hash:** `0x1234567890abcdef1234567890abcdef12345678`

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker build -t landora-frontend .
docker run -p 3000:3000 landora-frontend
```

### Vercel Deployment
```bash
npm i -g vercel
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏛 Government Compliance

This system is designed to comply with:
- Sri Lankan Land Registry Regulations
- Data Protection Laws
- Blockchain Technology Standards
- Government Digital Service Guidelines

## 📞 Support

For support, please contact:
- **Email**: support@landregistry.gov.lk
- **Phone**: +94 11 123 4567
- **Office**: Land Registry Department, Colombo 01

## 🙏 Acknowledgments

- Government of Sri Lanka - Land Registry Department
- Open Source Community
- Blockchain Technology Contributors
- Material-UI Team
- Next.js Team

---

**Built with ❤️ for Sri Lanka 🇱🇰** - Land Registry Frontend

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
