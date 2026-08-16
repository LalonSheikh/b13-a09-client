"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FaLightbulb,
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { authClient } from "@/lib/auth-client";
import { useTheme } from "@/components/ThemeProvider";

const Navbar = () => {
  // =========================
  // THEME
  // =========================
  const { theme, toggleTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // =========================
  // AUTH
  // =========================
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // =========================
  // THEME TOGGLE
  // =========================
  const handleThemeToggle = () => {
    if (!mounted) return;

    setTheme(theme === "dark" ? "light" : "dark");
  };

  // =========================
  // LOGOUT
  // =========================
  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout error:", error);
        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // =========================
  // PUBLIC LINKS
  // =========================
  const publicLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>

      <li>
        <Link href="/ideas">Ideas</Link>
      </li>
    </>
  );

  // =========================
  // PRIVATE LINKS
  // =========================
  const privateLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>

      <li>
        <Link href="/ideas">Ideas</Link>
      </li>

      <li>
        <Link href="/add-idea">Add Idea</Link>
      </li>

      <li>
        <Link href="/my-idea">My Ideas</Link>
      </li>

      <li>
        <Link href="/my-interactions">My Interactions</Link>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 border-b border-base-300 bg-base-100 px-4 shadow-sm">
      {/* =====================================================
          LEFT SECTION
      ===================================================== */}
      <div className="navbar-start">
        {/* ================= MOBILE MENU ================= */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            ☰
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl"
          >
            {user ? privateLinks : publicLinks}
          </ul>
        </div>

        {/* ================= LOGO ================= */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          {/* Logo Icon */}
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-md">
            <FaLightbulb />
          </span>

          {/* Logo Text */}
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            IdeaVolt
          </span>
        </Link>
      </div>

      {/* =====================================================
          CENTER SECTION
      ===================================================== */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 px-1 font-medium">
          {user ? privateLinks : publicLinks}
        </ul>
      </div>

      {/* =====================================================
          RIGHT SECTION
      ===================================================== */}
      <div className="navbar-end gap-2">
        {/* ===================================================
            THEME TOGGLE
        =================================================== */}
        <button
          type="button"
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? (
            <FaSun className="text-xl text-yellow-400" />
          ) : (
            <FaMoon className="text-xl" />
          )}
        </button>

        {/* ===================================================
            AUTH LOADING
        =================================================== */}
        {isPending ? (
          <span className="loading loading-spinner loading-sm" />
        ) : user ? (
          /* =================================================
             LOGGED IN USER
          ================================================= */
          <div className="dropdown dropdown-end">
            {/* ================= USER BUTTON ================= */}
            <div
              tabIndex={0}
              role="button"
              className="flex cursor-pointer items-center gap-3 rounded-full p-1 transition hover:bg-base-200"
            >
              {/* Avatar */}
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-purple-500"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 font-bold text-white">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}

              {/* Name + Email */}
              <div className="hidden sm:block">
                <p className="max-w-[150px] truncate text-sm font-bold">
                  {user.name || "User"}
                </p>

                <p className="max-w-[180px] truncate text-xs text-base-content/60">
                  {user.email}
                </p>
              </div>
            </div>

            {/* =================================================
                USER DROPDOWN
            ================================================= */}
            <ul
              tabIndex={-1}
              className="menu dropdown-content z-50 mt-3 w-64 rounded-box border border-base-300 bg-base-100 p-3 shadow-xl"
            >
              {/* ================= USER INFO ================= */}
              <li className="mb-2">
                <div className="flex items-center gap-3 border-b border-base-300 pb-3 hover:bg-transparent">
                  {/* Avatar */}
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={50}
                      height={50}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-purple-500"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 font-bold text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}

                  {/* Name / Email */}
                  <div className="min-w-0">
                    <p className="truncate font-bold">{user.name || "User"}</p>

                    <p className="truncate text-xs text-base-content/60">
                      {user.email}
                    </p>
                  </div>
                </div>
              </li>

              {/* ================= PROFILE ================= */}
              <li>
                <Link href="/profile-page">
                  <FaUser />
                  Profile
                </Link>
              </li>

              {/* ================= LOGOUT ================= */}
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* =================================================
             LOGGED OUT
          ================================================= */
          <div className="flex items-center gap-2">
            {/* ================= LOGIN ================= */}
            <Link href="/login">
              <span className="inline-block rounded-lg px-4 py-2 font-semibold transition hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950">
                Login
              </span>
            </Link>

            {/* ================= REGISTER ================= */}
            <Link href="/signup">
              <span className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2 font-semibold text-white shadow-md transition hover:from-purple-700 hover:to-pink-600 hover:shadow-lg">
                Register
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
