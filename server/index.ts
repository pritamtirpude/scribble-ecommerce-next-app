import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users } from "./schema";

const sql = neon(process.env.POSTGRES_URL!);

const schema = {
  users,
};

export const db = drizzle<typeof schema>(sql, { schema });
