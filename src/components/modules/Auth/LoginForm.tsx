"use client";

import { useState, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/providers/AuthProviders";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";




export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
   const router = useRouter();



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(email ,password);
      await login(email, password); 
      toast.success("Login successful!");
      router.push("/"); 
    } catch (err) {
      console.log(err);
      const errMsg = "Login failed";
      toast.error(errMsg);
    
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-main outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-main outline-none"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-main text-white font-semibold hover:bg-main/80 transition"
          >
             {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
