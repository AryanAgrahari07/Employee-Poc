import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useAuth } from "../hooks/useAuth";
import { LOGIN_MUTATION } from "../graphql/mutations/login";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data?.login) {
        const { token, user } = data.login;
        login(token, user);
      }
    },
    onError: (err) => {
      console.error("Login error:", err);
      const errorMessage = err.graphQLErrors?.[0]?.message || err.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
    }
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    loginMutation({ variables: { username, password } });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign in</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Username</label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-xs text-gray-500 text-center space-y-1">
          <p className="font-semibold">Demo Credentials:</p>
          <p>Admin: <span className="font-mono">admin</span> / <span className="font-mono">admin123</span></p>
          <p>Employee: <span className="font-mono">employee</span> / <span className="font-mono">employee123</span></p>
        </div>
      </div>
    </div>
  );
}
