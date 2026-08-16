"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaGoogle,
  FaLightbulb,
  FaUser,
  FaEnvelope,
  FaLink,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUsers,
  FaBolt,
  FaShieldAlt,
  FaCheck,
} from "react-icons/fa";
import { authClient } from "../../lib/auth-client";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const passwordRules = {
    minLength: formData.password.length >= 6,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
  };

  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.uppercase &&
    passwordRules.lowercase;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    console.log(user);
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.photoUrl,
    });

    if (data) {
      redirect("/");
    }
    if(error){
      alert('Error')
    }
  };

    const handleGoogleSignIn = async()=>{
    await authClient.signIn.social({
      provider:"google",
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="mx-auto flex justify-center max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-10 ">
          {/* ================= REGISTER CARD ================= */}
          <section className="flex items-center justify-center">
            <div className="w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-purple-100/60 sm:p-8 md:p-10">
              {/* Header */}
              <div className="text-center">
                {/* Mobile Logo */}
                <Link href="/" className="mb-6 inline-flex items-center gap-2 ">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 text-white">
                    <FaLightbulb />
                  </span>

                  <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent">
                    IdeaVolt
                  </span>
                </Link>

                <h2 className="text-3xl font-extrabold text-slate-900">
                  Create Your Account
                </h2>

                <p className="mt-2 text-slate-500">
                  Get started with your free account
                </p>
              </div>

              {/* Google Button */}
              <button onClick={handleGoogleSignIn}
                type="button"
                className="mt-8 flex w-full items-center cursor-pointer justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3.5 font-semibold text-slate-700 transition hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700"
              >
                <FaGoogle className="text-lg text-red-500" />
                Sign up with Google
              </button>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-sm font-medium text-slate-400">or</span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Name
                  </label>

                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                    />
                  </div>
                </div>

                {/* Photo URL */}
                <div>
                  <label
                    htmlFor="photoUrl"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Photo URL
                  </label>

                  <div className="relative">
                    <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      id="photoUrl"
                      name="photoUrl"
                      type="url"
                      value={formData.photoUrl}
                      onChange={handleChange}
                      placeholder="Enter your photo URL"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-12 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-purple-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    <PasswordRule
                      valid={passwordRules.minLength}
                      text="Minimum 6 characters"
                    />

                    <PasswordRule
                      valid={passwordRules.lowercase}
                      text="At least one lowercase (a-z)"
                    />

                    <PasswordRule
                      valid={passwordRules.uppercase}
                      text="At least one uppercase (A-Z)"
                    />
                  </div>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={!isPasswordValid}
                  className={`w-full rounded-xl py-3.5 text-base font-bold text-white transition ${
                    isPasswordValid
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg shadow-purple-200 hover:-translate-y-0.5 hover:from-purple-700 hover:to-pink-600"
                      : "cursor-not-allowed bg-slate-300"
                  }`}
                >
                  Register
                </button>
              </form>

              {/* Login */}
              <p className="mt-7 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-purple-600 transition hover:text-pink-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ================= PASSWORD RULE ================= */

function PasswordRule({ valid, text }) {
  return (
    <div
      className={`flex items-center gap-2 transition ${
        valid ? "text-green-600" : "text-slate-400"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          valid
            ? "border-green-500 bg-green-500 text-white"
            : "border-slate-300"
        }`}
      >
        {valid && <FaCheck className="text-[9px]" />}
      </span>

      <span>{text}</span>
    </div>
  );
}
