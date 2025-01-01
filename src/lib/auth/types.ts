// Authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}