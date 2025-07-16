"use server";

import { auth } from "@/lib/firebase";
import { LoginSchema, RegistrationSchema } from "@/schemas";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUser, getUserById } from "@/data/user";
import z from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/lib/getuser";

export const signup = async (values: z.infer<typeof RegistrationSchema>) => {
  const result = RegistrationSchema.safeParse(values);
  if (!result.success) {
    return { status: "error", error: result.error.issues[0].message };
  }

  const { email, password, gender } = result.data;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    const dbUser = await createUser({
      uid: user.uid,
      gender,
    });

    if (!dbUser) {
      throw new Error("Failed to create user in the database.");
    }
    const cookieStore = await cookies();
    const sessionCookie = await user.getIdToken();
    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 1,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return {
      status: "error",
      error: (error?.message as string) || "An error occurred during signup.",
    };
  }
};

export const signin = async (values: z.infer<typeof LoginSchema>) => {
  const result = LoginSchema.safeParse(values);
  if (!result.success) {
    return { status: "error", error: result.error.issues[0].message };
  }

  const { email, password } = result.data;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    const uid = user.uid;

    const dbUser = await getUserById(uid);
    if (!dbUser) {
      throw new Error("User not found in the database.");
    }
    const cookieStore = await cookies();
    const sessionCookie = await user.getIdToken();
    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 1,
    });
  } catch (error: any) {
    return {
      status: "error",
      error: (error?.message as string) || "An error occurred during signin.",
    };
  }
};

export const signout = async () => {
  try {
    await auth.signOut();
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });
    redirect("/auth");
  } catch (error: any) {
    return {
      status: "error",
      error: (error?.message as string) || "An error occurred during signout.",
    };
  }
};

export const getCurrentUser = async () => {
  const user = await getUserFromCookie();
  return user;
};
