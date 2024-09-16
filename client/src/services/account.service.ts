"use client";

import { Registration } from "@/types/registration.interface";
import { RequestResponse } from "@/types/request.interface";
import { User } from "@/types/user.interface";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/accounts`;

const getAccount = async (): Promise<User | null> => {
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
};

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

async function getAccountsCount(): Promise<Promise<number | null>> {
  try {
    const response = await fetch(`${API_URL}/count`, {
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

async function getActiveAccountsCount(): Promise<Promise<number | null>> {
  try {
    const response = await fetch(`${API_URL}/active/count`, {
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

async function getMonthlyRegistrations(): Promise<Promise<Registration[] | null>> {
  try {
    const response = await fetch(`${API_URL}/registrations`, {
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

export { deleteAccount, getAccount, getAccountsCount, getActiveAccountsCount, getMonthlyRegistrations };
