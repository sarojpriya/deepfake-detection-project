import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

export interface AuthPageProps {
  onLogin: (user: { id: number; username: string }) => void;
  onSignup: (user: { id: number; username: string }) => void;
}

const AuthPage = ({ onLogin, onSignup }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (email: string, password: string) => {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      onLogin({ id: data.user_id, username: email });
    } else {
      alert(data.detail || "Login failed");
    }
  };

  const handleSignup = async (
    username: string,
    email: string,
    password: string
  ) => {
    const res = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      onSignup({ id: data.user_id ?? 1, username });
    } else {
      alert(data.detail || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm
            onSubmit={handleLogin}
            onSwitchToSignup={() => setIsLogin(false)}
          />
        ) : (
          <SignupForm
            onSubmit={handleSignup}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
