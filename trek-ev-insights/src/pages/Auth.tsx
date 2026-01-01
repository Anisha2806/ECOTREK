
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { useAuth } from '@/hooks/useAuth';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { session } = useAuth();

  // Redirect to home if already logged in
  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="dashboard-card max-w-md w-full p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? 'Log in to track and visualize your energy usage' 
              : 'Sign up to start tracking your sustainable energy journey'}
          </p>
        </div>
        
        {isLogin ? <LoginForm /> : <SignupForm />}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-primary hover:underline focus:outline-none"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
