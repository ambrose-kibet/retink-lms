"use server";

import { getUserFromCookie } from "./getuser";

export const fetchUser = async () => {
  return await getUserFromCookie();
};
