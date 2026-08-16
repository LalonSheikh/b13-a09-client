"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaLightbulb,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const {
    data: session,
    isPending,
    error,
  } = authClient.useSession();

  const user = session?.user;

  console.log("SESSION:", session);
  console.log("USER:", user);


  



  const handleSignOut = async () => {
    await authClient.signOut();

    window.location.href = "/";
  };

  const links = [
    <li key="home">
      <Link href="/">Home</Link>
    </li>,

    <li key="ideas">
      <Link href="/ideas">Ideas</Link>
    </li>,

    <li key="add-idea">
      <Link href="/add-idea">Add Idea</Link>
    </li>,

    <li key="my-idea">
      <Link href="/my-idea">My Ideas</Link>
    </li>,

    <li key="my-interactions">
      <Link href="/my-interactions">
        My Interactions
      </Link>
    </li>,
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">

      {/* LEFT */}
      <div className="navbar-start">

        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            ☰
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 text-white">
            <FaLightbulb />
          </span>

          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            IdeaVolt
          </span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end">

        {/* Loading */}
        {isPending ? (
          <span className="loading loading-spinner loading-sm" />
        ) : user ? (

          /* ================= LOGGED IN ================= */
          <div className="dropdown dropdown-end">

            {/* Avatar */}
            <div
              tabIndex={0}
              role="button"
              className="flex cursor-pointer items-center gap-3 rounded-full p-1 hover:bg-base-200"
            >

              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-purple-500"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white">
                  <FaUser />
                </div>
              )}

              <div className="hidden sm:block">
                <p className="text-sm font-bold">
                  {user.name}
                </p>

                <p className="max-w-[180px] truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

            </div>

            {/* PROFILE DROPDOWN */}
            <ul
              tabIndex={-1}
              className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-64 p-3 shadow-xl"
            >

              {/* User info */}
              <li className="mb-2">
                <div className="flex items-center gap-3 border-b pb-3 hover:bg-transparent">

                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={50}
                      height={50}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white">
                      <FaUser />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-bold">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                </div>
              </li>

              {/* Profile */}
              <li>
                <Link href="/profile">
                  <FaUser />
                  Profile
                </Link>
              </li>

              {/* My Ideas */}
              <li>
                <Link href="/my-idea">
                  <FaLightbulb />
                  My Ideas
                </Link>
              </li>

              {/* Logout */}
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-red-500 hover:bg-red-50"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>

            </ul>
          </div>

        ) : (

          /* ================= NOT LOGGED IN ================= */
          <div className="flex items-center gap-2">

            <Link href="/login">
              <button className="rounded-lg px-4 py-2 font-semibold hover:bg-purple-50 hover:text-purple-600">
                Login
              </button>
            </Link>

            <Link href="/signup">
              <button className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2 font-semibold text-white">
                Register
              </button>
            </Link>

          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;