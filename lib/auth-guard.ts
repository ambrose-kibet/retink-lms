import { auth } from "@/lib/firebase";
import { cookies } from "next/headers";

const authGuard = async (handler: any) => {
  const cookieStore = await cookies();

  const user = auth.currentUser;
  if (!user) return null;

  // Refresh the ID token to ensure it's up-to-date
  const freshIdToken = await user.getIdToken(true);
  cookieStore.set("session", freshIdToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  const uid = user.uid;

  console.log(uid);

  if (!uid) {
    return null;
  }

  return uid;
};
