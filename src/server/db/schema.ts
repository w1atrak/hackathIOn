// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  json
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `hackathion_${name}`);

export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    email: varchar("email", { length: 256 }).unique(),
    classId: integer("classId").references(() => classes.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    nameIndex: index("user_name_idx").on(example.name),
  }),
);

export const classes = createTable(
  "classes",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    imageUrl: varchar("imageUrl", { length: 256 }).notNull(),
  },
  (example) => ({
    nameIndex: index("class_name_idx").on(example.name),
  }),
);

export const tasks = createTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    code: varchar("code", { length: 256 }).notNull().unique(),
    data: json("data").default(sql`'{}'`).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    nameIndex: index("task_name_idx").on(example.name),
  }),
);

export const scores = createTable(
  "scores",
  {
    id: serial("id").primaryKey(),
    points: integer("points").notNull(),
    userId: integer("userId").references(() => users.id),
    taskId: integer("taskId").references(() => tasks.id),
  },
  (example) => ({
    nameIndex: index("user_idx").on(example.userId),
  }),
);