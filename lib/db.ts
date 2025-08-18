// Database connection helper (mock)
export const db = {
  // Mock database connection
  connect: async () => {
    console.log('Connected to database');
    return true;
  },
  
  disconnect: async () => {
    console.log('Disconnected from database');
    return true;
  },
  
  // Mock queries
  query: async (sql: string, params?: any[]) => {
    console.log('Executing query:', sql, params);
    return { rows: [], rowCount: 0 };
  },
};

// Configuration
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
  app: {
    name: 'Land Registry System',
    version: '1.0.0',
  },
};

// Auth helpers
export const auth = {
  getCurrentUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },
  
  isAuthenticated: () => {
    return auth.getCurrentUser() !== null;
  },
  
  isAdmin: () => {
    const user = auth.getCurrentUser();
    return user && user.role === 'admin';
  },
  
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },
};
