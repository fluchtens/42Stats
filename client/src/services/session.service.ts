"use client";

import { Session } from "@/types/session.interface";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/sessions`;

async function getSessions(): Promise<Promise<Session[] | null>> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

async function deleteSession(id: string): Promise<Promise<String | null>> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

export { deleteSession, getSessions };
