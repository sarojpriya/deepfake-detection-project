import { useState } from "react";

interface Props {
  onSubmit: (email: string, password: string) => Promise<void>;
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSubmit, onSwitchToSignup }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <h1 className="text-2xl font-bold text-indigo-600 text-center">
        Welcome Back
      </h1>

      <p className="text-center text-gray-600 mt-2">
        Sign in to your deepfake detection account
      </p>

      <input
        type="email"
        placeholder="Email address"
        className="mt-6 w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="mt-4 w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        onClick={() => onSubmit(email, password)}
      >
        Sign In
      </button>

      <p className="mt-4 text-center text-gray-600">
        Don’t have an account?{" "}
        <span
          className="text-indigo-600 font-medium cursor-pointer"
          onClick={onSwitchToSignup}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}
