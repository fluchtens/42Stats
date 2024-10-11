"use client";

import { RequestResponse } from "@/types/request.interface";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/accounts`;

const deleteAccount = async (): Promise<RequestResponse> => {
  try {
    const response = await fetch(API_URL, {
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
    return { success: false, message: "An error occurred while deleting your account." };
  }
};

export { deleteAccount };
