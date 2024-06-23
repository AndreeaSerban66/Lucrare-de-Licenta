"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Banner from "../Banner";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <>
      <Banner title="Login"></Banner>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col bg-tiffany_blue py-[200px] px-[100px] gap-24 rounded-lg">
          <h2 className="text-center text-2xl font-poppins text-white">
            {session ? "Welcome, " + session.user?.name : "Conectează-te"}
          </h2>
          <div className="mt-8">
            {!session ? (
              <>
                <button
                  onClick={() => signIn("google")}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in with Google
                </button>
                <button
                  onClick={() => signIn("facebook")}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
                >
                  Sign in with Facebook
                </button>
                <button
                  onClick={() => signIn("github")}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 mt-4"
                >
                  Sign in with Github
                </button>
              </>
            ) : (
              <button
                onClick={() => signOut()}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
