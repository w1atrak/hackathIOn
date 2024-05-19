"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Chatbox from "~/app/Chatbox";
import { useSharedState } from "../context";

type ClassType = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function ClassSelection() {
  const { userId } = useSharedState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [classOptions, setClassOptions] = useState<ClassType[]>([]);

  const [classSelected, setClassSelected] = useState(false);

  const[chatLines, setChatLines] = useState([""]);
  const [isChatboxComplete, setIsChatboxComplete] = useState(false);
  useEffect(() => {
    if (isChatboxComplete) {
      router.push('/home');
    }
  }, [isChatboxComplete]);

  function setChatLinesBasedOnClass(class_name: int){
    let lines = [];
    switch(class_name) {
      case 5:
        lines = ['Masz oko do detali i wierzysz, że świat można uczynić piękniejszym? Jako UI/UX designer będziesz tworzyć interfejsy tak intuicyjne, że nawet babcia sobie z nimi poradzi, a jednocześnie tak piękne, że konkurencja zzielenieje z zazdrości.'];
        break;
      case 6:
        lines = ['Chcesz tworzyć krajobrazy, kształtować osobowości i ścieżki bohaterów? Jako Game developer staniesz się niczym władca wszechświata. Każda linijka Twojego kodu będzie wpływać na świat – co prawda ten wirtualny, ale Twoje gry będą tak wciągające, że będą wydawać się bardziej prawdziwe niż rzeczywistość!'];
        break;
      case 7:
        lines = ['Lubisz mieć wszystko pod kontrolą i nie ma dla Ciebie rzeczy niemożliwych? Full-Stack developer to ścieżka zawodowa dla Ciebie. Twoje spektrum umiejętności będzie niczym szwajcarski scyzoryk (i równie bezcenne).'];
        break;
      case 8:
          lines = ['Chcesz sprawić, że maszyny będą mądrzejsze niż kiedykolwiek oraz kształtować przyszłość? Jako AI Engineer nauczysz się projektować oraz trenować modele, które będą pomagać ludziom we wszelkich zadaniach (przynajmniej dopóki nie przejmą władzy nad światem).'];
          break;
      default:
        lines = ['Welcome!', 'You have selected a class!'];
    }
    lines.push("Przynajmniej nie ceramika...");
    lines.push("Teraz ruszaj na poszukiwania wyzwań! Odwiedź prowadzących na stanowiskach by dowiedzieć się jakie zadania na ciebie czekają. Być może znajdziesz też coś ciekawego między stoiskami...")
    lines.push("Powodzenia!")
    setChatLines(lines);
  }

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('https://test.nyaaa.me/data/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: { classes: ClassType[] } = await response.json();

        const classesWithImages: ClassType[] = data.classes.map(cls => ({
          ...cls,
          imageUrl: `/${cls.imageUrl}`,
        }));
        
        setClassOptions(classesWithImages);
      } catch (error) {
        console.error('Error fetching classes:', error);
        alert('Wystąpił błąd podczas pobierania klas!');
      }
    };

    fetchClasses().catch(console.error);
  }, []);

  const handleSelectClass = async (classId: number) => {
    setLoading(true);
    console.log(localStorage);
    const userId = localStorage.getItem("userId");

    setClassSelected(true);

    if (!userId) {
      alert("Nie znaleziono użytkownika!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://test.nyaaa.me/users/class', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: Number(userId), classId })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log(`Class updated successfully to ${classId} for user ${userId}`);
    } catch (error) {
      console.error("Wystąpił błąd podczas aktualizacji klasy:", error);
      alert("Wystąpił błąd podczas aktualizacji klasy!");
    } finally {
      setLoading(false);
      setChatLinesBasedOnClass(classId);
    }
  };

  return (
    <main className="flex flex-col items-center text-center justify-center min-h-screen">
      {!classSelected && <div>
        <h1 className="text-4xl mb-8">WYBIERZ SWOJE<br />✨PRZEZNACZENIE✨</h1>
        <div>btw twoje id to: {userId}</div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {classOptions.map((cls) => (
            <div
              key={cls.id}
              className="image-container cursor-pointer"
              onClick={() => handleSelectClass(cls.id)}
            >
              <Image src={cls.imageUrl} alt={cls.name} width={200} height={200} />
              <span>{cls.name}</span>
            </div>
          ))}
        </div>
        {loading && <p>Aktualizowanie...</p>}
      </div>}
      {classSelected &&
        <div>
          <div>

          </div>
          <Chatbox chatLines = {chatLines} showTitle={false} setIsChatboxComplete={setIsChatboxComplete}></Chatbox>
        </div>
      }
    </main>
  );
}
