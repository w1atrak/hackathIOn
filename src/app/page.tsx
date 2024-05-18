import { db } from "~/server/db";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const users = await db.query.users.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Hello
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </main>
  );
}
