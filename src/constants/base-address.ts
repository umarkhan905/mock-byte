export const BASE_ADDRESS =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://mock-byte.vercel.app";
