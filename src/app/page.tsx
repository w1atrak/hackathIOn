"use client";

import WelcomePage from "~/app/welcome";
export const dynamic = "force-dynamic";
import ClassSelection from '~/components/ClassSelection';

export default async function HomePage() {
    return (
        <main className="relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url("/WI.jpg")' }}></div>
            <WelcomePage></WelcomePage>
        </main>
    );
}
