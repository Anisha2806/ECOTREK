
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex items-center space-x-1 bg-secondary dark:bg-muted rounded-full p-1">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-full transition-all ${
          theme === 'light' 
            ? 'bg-primary text-white' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Use light theme"
      >
        <Sun className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-full transition-all ${
          theme === 'dark' 
            ? 'bg-primary text-white' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Use dark theme"
      >
        <Moon className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-full transition-all ${
          theme === 'system' 
            ? 'bg-primary text-white' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Use system theme"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ThemeToggle;
