"use client";

import { RequestResponse } from "@/types/request.interface";
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

async function deleteSession(id: string): Promise<RequestResponse> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message };
    }

    return { success: true, message: data.message };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: "An error occurred while trying to delete the session." };
  }
}

export { deleteSession, getSessions };
