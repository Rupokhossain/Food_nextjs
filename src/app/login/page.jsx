"use client";

import React, { useState, useEffect } from "react"; 
import Link from "next/link";
import { FaGithub, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import Image from "next/image";
import pizzaImage from "../../../public/assets/images/about.png"; 
import { signIn, useSession } from "next-auth/react"; // useSession যোগ করা হয়েছে
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast"; 
import { motion } from "framer-motion"; 

export default function LoginPage() {
  const { status } = useSession(); // সেশন চেক করার জন্য
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

 
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/"); 
    }
  }, [status, router]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSocialLogin = (provider) => {
    signIn(provider, { callbackUrl: "/" }); 
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        toast.error("Invalid Email or Password!");
        setLoading(false);
      } else {
        toast.success("Login Successful!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#f58220] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen py-10 items-center justify-center bg-gray-50"
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex w-full max-w-6xl shadow-2xl rounded-2xl overflow-hidden bg-white mx-4 relative">
        
        <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-red-500 z-50 lg:hidden">
            ✕
        </Link>

        {/* ============ LEFT SIDE: IMAGE ============ */}
        <div className="hidden lg:flex w-1/2 relative bg-[#FFF6ED] items-center justify-center p-12">
          {/* Animated Background Shapes */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute w-[120%] h-[120%] bg-[#f58220]/10 rounded-full -top-1/4 -left-1/4"
          ></motion.div>

          <div className="relative z-10 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={pizzaImage}
                className="rounded-2xl shadow-xl object-cover max-w-sm mx-auto border-4 border-white"
                alt="Login Image"
                width={400}
                height={400}
              />
            </motion.div>
            <h2 className="mt-8 text-3xl font-bold text-[#1A2B3D]">
              Delicious Food Awaits!
            </h2>
            <p className="text-gray-500 mt-4 max-w-xs mx-auto">
              Login to track orders & save your favorites.
            </p>
          </div>
        </div>

        {/* ============ RIGHT SIDE: FORM ============ */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-4xl font-extrabold text-[#1A2B3D] mb-2">
                Welcome Back 👋
              </h1>
              <p className="text-gray-500">
                Please enter your details to sign in.
              </p>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => signIn("google")}
                className="flex items-center justify-center cursor-pointer gap-2 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform active:scale-95"
              >
                <FaGoogle className="text-2xl" />
                <span className="font-semibold text-gray-700">Google</span>
              </button>
              <button
                onClick={() => signIn("github")}
                className="flex items-center justify-center cursor-pointer gap-2 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform active:scale-95"
              >
                <FaGithub className="text-2xl text-gray-800" />
                <span className="font-semibold text-gray-700">GitHub</span>
              </button>
            </div>

            <div className="relative flex py-2 items-center mb-6">
              <div className="grow border-t border-gray-200"></div>
              <span className="shrink-0 mx-4 text-gray-400 text-sm bg-white px-2">
                Or sign in with email
              </span>
              <div className="grow border-t border-gray-200"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#1A2B3D] mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#f58220] focus:ring-1 focus:ring-[#f58220] outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-semibold text-[#1A2B3D]">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs text-[#f58220] hover:underline font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#f58220] focus:ring-1 focus:ring-[#f58220] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#f58220] transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Login Button with Loading State */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-3.5 rounded-lg shadow-lg text-white transition-all duration-300 transform cursor-pointer 
                ${
                  loading
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-[#f58220] hover:bg-[#d96a17] active:scale-95 hover:shadow-xl"
                }
              `}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Dont have an account?{" "}
              <Link
                href="/signup"
                className="text-[#f58220] font-bold hover:underline"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}