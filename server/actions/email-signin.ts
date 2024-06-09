"use server";

import { loginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

const action = createSafeActionClient();

export const emailSignIn = action(
  loginSchema,
  async ({ email, password, code }) => {
    // check user exists in the database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser?.email !== email) {
      return { error: "User not found" };
    }

    // if(!existingUser.emailVerified){

    // }

    return { success: email };
  }
);
