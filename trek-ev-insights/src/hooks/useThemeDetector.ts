
import { useEffect, useState } from 'react';

export default function useThemeDetector() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Check for the user's time preference
    const currentHour = new Date().getHours();
    const isNightTime = currentHour < 6 || currentHour >= 19;
    
    // Check if the system prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use night time or system preference to determine default
    return isNightTime || prefersDark;
  });

  useEffect(() => {
    const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches);
    };
    
    // Set up listener for system theme changes
    darkThemeMediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Set up timer to check time-based theme changes
    const intervalId = setInterval(() => {
      const currentHour = new Date().getHours();
      const shouldBeDark = currentHour < 6 || currentHour >= 19;
      
      // Only update if the system theme isn't already dictating the theme
      if (!darkThemeMediaQuery.matches) {
        setIsDarkTheme(shouldBeDark);
      }
    }, 60000); // Check every minute
    
    return () => {
      darkThemeMediaQuery.removeEventListener('change', handleSystemThemeChange);
      clearInterval(intervalId);
    };
  }, []);

  return isDarkTheme;
}
