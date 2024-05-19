"use client";

import Home from "~/app/home/home";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    return (
        <div className="relative flex items-center h-screen flex-col">
            <div className="absolute inset-0 bg-cover bg-center opacity-50"
                 style={{backgroundImage: 'url("/WI.jpg")'}}></div>
            <div className="mt-10 relative z-10 w-full px-4"> {/* Dodano w-full i px-4 */}
                <Home />
            </div>
        </div>
    );
}
