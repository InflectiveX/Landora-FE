
# Landora Land Registry Frontend

This is the frontend for the Landora Land Registry System, built with React, Vite, and Material-UI. It provides a modern, secure, and user-friendly interface for property registration, verification, transfer, and administration.

## Features

- **User Dashboard**: Citizens can register properties, view transaction history, and manage their profile.
- **Property Registration**: Guided process for submitting new property details and documents.
- **Verification Queue**: Admins can review and verify property submissions.
- **Property Transfer**: Secure transfer of property ownership.
- **Officer Management**: Admins can add, edit, and remove government officers from the system (see `/admin/officers`).
- **Help & Support**: Comprehensive help center with FAQs, guides, and contact options.
- **Authentication**: Secure login for citizens and officers.
- **Modern UI**: Responsive design with Material-UI and custom themes.

## Project Structure

- `src/pages/` — Main pages (Dashboard, Login, LandRegistration, OfficerManagement, etc.)
- `src/components/common/` — Shared layout and UI components
- `src/theme/` — Theme customization
- `public/` — Static assets

## Officer Management

Admins can manage government officers via the Officer Management page:

- Navigate to **Admin Panel** → **Manage Officers**
- Add, edit, or remove officers
- Officers have name, email, department, and status fields

## Getting Started

1. Install dependencies:
	```sh
	npm install
	```
2. Start the development server:
	```sh
	npm run dev
	```
3. Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- React
- Vite
- Material-UI
- React Router
- React Hook Form
- Notistack (notifications)

---
For more details, see the code in the `src/` directory.
