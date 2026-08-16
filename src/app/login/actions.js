"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function loginAction(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });
  } catch (error) {
    console.error("Login error:", error);

    return {
      error: error.message || "Invalid email or password.",
    };
  }

  redirect("/");
}