import db from "@/lib/prisma";

export const createUser = async ({
  uid,
  gender,
}: {
  uid: string;
  gender: string;
}) => {
  try {
    const user = await db.user.create({
      data: {
        id: uid,
        gender,
      },
    });
    return { status: "success", user };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error: any) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};
