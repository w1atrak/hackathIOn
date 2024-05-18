"use client";

import ClassSelection from "~/app/class/ClassSelection";

export const dynamic = "force-dynamic";

export default function HomePage() {
    return (
        <div className="relative flex items-center justify-center h-screen flex-col">
            <div className="absolute inset-0 bg-cover bg-center opacity-50"
                 style={{backgroundImage: 'url("/WI.jpg")'}}></div>
            <div className="relative z-10">
                <ClassSelection></ClassSelection>
            </div>
        </div>
    );
}
