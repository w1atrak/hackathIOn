import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

import * as schema from "./schema";
import { eq } from "drizzle-orm";

export const db = drizzle(sql, { schema });

export async function updateUserPoints(userId: number, points: number) {
  return db.update(schema.users)
    .set({ points })
    .where(eq(schema.users.id, userId));
}

export async function getUserById(userId: number) {
  return db.query.users.findFirst({
    where: eq(schema.users.id, userId)
  });
}