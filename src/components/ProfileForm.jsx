"use client";

import { useState } from "react";
import Image from "next/image";
import { FaUser, FaEnvelope, FaSave } from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

export default function ProfileForm({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    refetch,
  } = authClient.useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        setError(
          error.message || "Failed to update profile."
        );
        return;
      }

      console.log("Updated user:", data);

      // Get latest user information
      await refetch();

      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Update profile error:", err);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Profile Photo */}
      <div className="mb-8 flex items-center gap-5 border-b border-slate-100 pb-7">

        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover ring-4 ring-purple-100"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-2xl font-bold text-white">
            {user?.name
              ?.charAt(0)
              ?.toUpperCase() || "U"}
          </div>
        )}

        <div>
          <h3 className="font-bold text-slate-800">
            Profile Photo
          </h3>

          <p className="text-sm text-slate-500">
            Your current profile photo.
          </p>
        </div>

      </div>

      {/* ================= NAME ================= */}
      <div className="mb-6">

        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Full Name
        </label>

        <div className="relative">

          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
            className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          />

        </div>

      </div>

      {/* ================= EMAIL ================= */}
      <div>

        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Email Address
        </label>

        <div className="relative">

          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            id="email"
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-500"
          />

        </div>

        <p className="mt-2 text-xs text-slate-400">
          Email cannot be changed directly.
        </p>

      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Success */}
      {message && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
          {message}
        </div>
      )}

      {/* Save */}
      <button
        type="submit"
        disabled={loading}
        className="mt-7 flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        <FaSave />

        {loading
          ? "Saving..."
          : "Save Changes"}
      </button>

    </form>
  );
}