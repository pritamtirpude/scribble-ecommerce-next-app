"use server";

import { createSafeActionClient } from "next-safe-action";
import { registerSchema } from "@/types/register-schema";
import bcrypt from "bcryptjs";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendverificationEmail } from "./email";

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
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendverificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );

        return { success: "Email Confirmation resent" };
      }
      return { error: "Email already in use" };
    }

    await db.insert(users).values({
      email,
      name,
    });

    const verificationToken = await generateEmailVerificationToken(email);
    await sendverificationEmail(
      verificationToken[0].email,
      verificationToken[0].token
    );

    return { success: "Confirmation Email Sent" };
  }
);
