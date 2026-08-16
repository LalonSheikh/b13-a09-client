import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

import { auth } from "@/lib/auth";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If not logged in
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Welcome, {user.name}!
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your profile information and account settings.
          </p>
        </div>

        {/* Profile Card */}
        <section className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
          
          {/* Title */}
          <div className="mb-8 flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              👤
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Profile Details
            </h2>
          </div>

          {/* Profile Form */}
          <ProfileForm user={user} />

        </section>
      </div>
    </main>
  );
}