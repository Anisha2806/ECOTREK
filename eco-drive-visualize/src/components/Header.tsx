
import React from 'react';
import { Link } from 'react-router-dom';
import { Battery, Gauge, ChevronDown, LogOut, LogIn, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const { toast } = useToast();
  const { user, signOut, session } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  const getInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="w-full py-4 px-6 glass sticky top-0 z-30 animate-fade-in">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Gauge className="h-7 w-7 text-primary" />
          <Link to="/" className="text-xl font-medium tracking-tight">EcoDrive</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm hover:text-primary transition-colors">Dashboard</Link>
          <Link to="/" className="text-sm hover:text-primary transition-colors">Insights</Link>
          <Link to="/" className="text-sm hover:text-primary transition-colors">History</Link>
          <Link to="/" className="text-sm hover:text-primary transition-colors">Settings</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Battery className="h-5 w-5 text-renewable" />
          
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium rounded-full px-3 py-1 border border-border hover:bg-secondary transition-colors">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
                    {getInitials()}
                  </span>
                  <span className="hidden sm:inline">{user?.email}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link 
              to="/auth" 
              className="flex items-center gap-1 text-sm font-medium rounded-full px-3 py-1 border border-border hover:bg-secondary transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
