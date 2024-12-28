import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Globe, Upload, User } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6" />
          <span className="text-xl font-bold">EchoLang</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}