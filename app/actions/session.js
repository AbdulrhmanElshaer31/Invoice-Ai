"use server";
import { cookies } from "next/headers";
export  async function setSession(payload) {
  const cookieStore = await cookies();

  const sessionData = JSON.stringify(payload);

  cookieStore.set("session_data", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const sessionData = cookieStore.get("session_data")?.value;

    if (!sessionData) return null;

    const payload = JSON.parse(sessionData);
    return payload;
  } catch (error) {
    console.error("Session parsing failed:", error);
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session_data");
}
