"use client";

import LoginPage from "~/app/login/login";
export const dynamic = "force-dynamic";

export default function LogInPage() {
  return (
    <div className="relative flex items-center justify-center h-screen flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: 'url("/WI.jpg")' }}
      ></div>
      <div className="relative z-10 p-8 rounded-lg shadow-lg">
        <LoginPage />
      </div>
    </div>
  );
}