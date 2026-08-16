"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const MyInteractionPage = () => {
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const user = session?.user;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    const loadMyComments = async () => {
      try {
        setLoading(true);

        // Get all ideas
        const res = await fetch("http://localhost:5000/ideas");

        if (!res.ok) {
          throw new Error("Failed to fetch ideas");
        }

        const ideas = await res.json();

        // Collect comments made by current user
        const myComments = [];

        ideas.forEach((idea) => {
          if (!Array.isArray(idea.comments)) return;

          idea.comments.forEach((comment) => {
            if (comment.userName === user.name) {
              myComments.push({
                ...comment,
                ideaId: idea._id,
                ideaTitle: idea.title,
              });
            }
          });
        });

        // Latest comments first
        myComments.sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        setComments(myComments);
      } catch (error) {
        console.error("Failed to load interactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMyComments();
  }, [user, sessionLoading]);

  // ==============================
  // LOADING SESSION
  // ==============================

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
          <div className="mt-3 h-4 w-96 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  // ==============================
  // NOT LOGGED IN
  // ==============================

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            My Interactions
          </h1>

          <p className="mt-3 text-gray-500">
            Please login to see your comments and interactions.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 font-semibold text-white"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            My Interactions
          </h1>

          <p className="mt-2 text-gray-500">
            View ideas you've liked and comments you've made.
          </p>
        </div>

        {/* ================= TABS ================= */}

        <div className="mt-8 border-b border-gray-400">
          <div className="inline-block border-b-2 border-purple-600 px-4 pb-3">
            <span className="font-bold text-purple-600">
              Comments ({comments.length})
            </span>
          </div>
        </div>

        {/* ================= CONTENT ================= */}

        {loading ? (
          <div className="mt-5 rounded-xl bg-white p-6 shadow-sm">
            <div className="animate-pulse space-y-3">
              <div className="h-5 w-72 rounded bg-gray-200" />
              <div className="h-4 w-96 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>
          </div>
        ) : comments.length === 0 ? (
          <div className="mt-5 rounded-xl bg-white p-10 text-center shadow-sm">
            <div className="text-4xl">💬</div>

            <h2 className="mt-3 text-xl font-bold text-gray-800">
              No comments yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your comments on ideas will appear here.
            </p>

            <Link
              href="/ideas"
              className="mt-5 inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 font-semibold text-white"
            >
              Explore Ideas
            </Link>
          </div>
        ) : (
          <div className="mt-5 space-y-3">

            {comments.map((comment) => (
              <Link
                href={`/ideas/${comment.ideaId}`}
                key={comment._id}
                className="block rounded-xl bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* IDEA TITLE */}

                <h2 className="text-lg font-bold text-gray-900">
                  {comment.ideaTitle}
                </h2>

                {/* COMMENT */}

                <p className="mt-2 text-gray-600">
                  {comment.text}
                </p>

                {/* DATE */}

                <p className="mt-3 text-sm text-gray-400">
                  {comment.createdAt
                    ? new Date(
                        comment.createdAt
                      ).toLocaleDateString()
                    : ""}
                </p>
              </Link>
            ))}

          </div>
        )}
      </div>
    </main>
  );
};

export default MyInteractionPage;