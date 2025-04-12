"use server";

import { auth } from "@/auth";

const getUserRole = async () => {
  const session = await auth();
  return session?.user?.role;
};

export { getUserRole };
