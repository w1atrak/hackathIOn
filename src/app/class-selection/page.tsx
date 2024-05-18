"use client";

import { useRouter } from "next/navigation";

const classes = [
  { name: "Graphic Designer", description: "Opis Graphic Designer" },
  { name: "Developer", description: "Opis Developer" },
  { name: "Team Leader", description: "Opis Team Leader" },
  // Dodaj więcej klas według potrzeb
];

export default function ClassSelectionPage() {
  const router = useRouter();

  const handleSelectClass = (className: string) => {
    localStorage.setItem("userClass", className);
    router.push("/game");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-4xl mb-4">Wybierz swoją klasę postaci</h1>
      <div className="flex flex-wrap justify-center">
        {classes.map((cls) => (
          <div
            key={cls.name}
            className="m-2 p-4 bg-blue-500 rounded cursor-pointer"
            onClick={() => handleSelectClass(cls.name)}
          >
            <h2 className="text-2xl">{cls.name}</h2>
            <p>{cls.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
