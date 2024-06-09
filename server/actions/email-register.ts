"use server";

import { createSafeActionClient } from "next-safe-action";
import { registerSchema } from "@/types/register-schema";
import bcrypt from "bcryptjs";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";

const action = createSafeActionClient();

export const emailRegister = action(
  registerSchema,
  async ({ email, name, password }) => {
    const hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // Check if email is already in the database than say it's in use, if it's not register teh user but also send teh verification
    if (existingUser) {
      //   if (!existingUser.emailVerified) {
      //     const verificationToken;
      //   }
      return { error: "Email already in use" };
    }

    return { success: "ayy" };
  }
);
