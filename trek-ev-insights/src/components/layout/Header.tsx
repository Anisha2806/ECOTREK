
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-eco-blue to-eco-green bg-clip-text text-transparent">
              EcoTreck
            </span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <NavLink to="/" current={location.pathname === "/"}>
              Dashboard
            </NavLink>
            <NavLink to="/analytics" current={location.pathname === "/analytics"}>
              Analytics
            </NavLink>
            <NavLink to="/recommendations" current={location.pathname === "/recommendations"}>
              Smart Tips
            </NavLink>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background animate-fade-in md:hidden">
          <nav className="container grid gap-6 p-6">
            <MobileNavLink to="/" current={location.pathname === "/"}>
              Dashboard
            </MobileNavLink>
            <MobileNavLink to="/analytics" current={location.pathname === "/analytics"}>
              Analytics
            </MobileNavLink>
            <MobileNavLink to="/recommendations" current={location.pathname === "/recommendations"}>
              Smart Tips
            </MobileNavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  current: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, current, children }: NavLinkProps) => (
  <Link
    to={to}
    className={`text-sm font-medium transition-colors hover:text-primary ${
      current 
        ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary' 
        : 'text-muted-foreground'
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, current, children }: NavLinkProps) => (
  <Link
    to={to}
    className={`flex items-center rounded-md border p-4 text-foreground transition-colors hover:text-primary ${
      current 
        ? 'bg-muted/40 border-border' 
        : 'border-transparent'
    }`}
  >
    {children}
  </Link>
);

export default Header;
