"use client";

import Link from "next/link";
import { useState, useActionState } from "react";
import {
  FaGoogle,
  FaLightbulb,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";

import { loginAction } from "./actions";
import { authClient } from "@/lib/auth-client";

const initialState = {
  error: "",
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );

  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

        <section className="w-full max-w-md">

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-purple-100/60 sm:p-8">

            {/* ================= LOGO ================= */}
            <div className="text-center">

              <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-lg">
                  <FaLightbulb />
                </span>

                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent">
                  IdeaVolt
                </span>
              </Link>

              <h1 className="text-3xl font-extrabold text-slate-900">
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Login to continue to your IdeaVolt account
              </p>

            </div>

            {/* ================= ERROR TOAST ================= */}
            {state?.error && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm">

                <span className="mt-0.5">
                  ⚠️
                </span>

                <p>{state.error}</p>

              </div>
            )}

            {/* ================= GOOGLE LOGIN ================= */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3.5 font-semibold text-slate-700 transition duration-200 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700"
            >
              <FaGoogle className="text-lg text-red-500" />

              Continue with Google
            </button>

            {/* ================= DIVIDER ================= */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-sm font-medium text-slate-400">
                or
              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>

            {/* ================= LOGIN FORM ================= */}
            <form action={formAction} className="space-y-5">

              {/* EMAIL */}
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
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Password
                  </label>

                  {/* UI ONLY */}
                 <Link href={'/forget-password'}>
                  <button
                    type="button"
                    
                    className="text-sm font-semibold text-purple-600 hover:text-pink-500"
                  >
                    Forgot Password?
                  </button>
                 </Link>

                </div>

                <div className="relative">

                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-12 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-purple-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>

              {/* ================= LOGIN BUTTON ================= */}
              <button
                type="submit"
                disabled={pending}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold text-white transition ${
                  pending
                    ? "cursor-not-allowed bg-slate-400"
                    : "bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg shadow-purple-200 hover:-translate-y-0.5 hover:from-purple-700 hover:to-pink-600"
                }`}
              >
                {pending ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    Login
                  </>
                )}
              </button>

            </form>

            {/* ================= REGISTER ================= */}
            <p className="mt-7 text-center text-sm text-slate-500">

              Don't have an account?{" "}

              <Link
                href="/signup"
                className="font-bold text-purple-600 transition hover:text-pink-500"
              >
                Create an account
              </Link>

            </p>

            {/* ================= HOME ================= */}
            <div className="mt-5 text-center">

              <Link
                href="/"
                className="text-sm font-medium text-slate-400 transition hover:text-purple-600"
              >
                ← Back to Home
              </Link>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}