import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Globe, Upload, User } from 'lucide-react';
import { useAuth } from '@/features/auth';
import Logo from '../../public/echolang-final.png';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={Logo}
            alt="EchoLang Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {isAuthenticated ? (
            <>
              {user?.role === 'customer' && (
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
                </>
              )}
              {user?.role === 'admin' && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </Button>
              )}
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