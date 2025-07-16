import { cookies } from "next/headers";
import db from "@/lib/prisma";
import { initAdmin } from "@/lib/firebase";
import { User } from "@/lib/types";

export async function getUserFromCookie(): Promise<User | null> {
  const firebaseAdmin = await initAdmin();

  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token, true);

    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const user = await db.user.findUnique({ where: { id: uid } });
    if (!user) {
      console.error("User not found in database:", uid);
      return null;
    }

    return { ...user, email } as User;
  } catch (error: any) {
    console.error("Error verifying token:", error);
    return null;
  }
}
