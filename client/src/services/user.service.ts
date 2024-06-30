"use client";

import { User } from "@/types/user.interface";

const API_URL = "http://localhost:8080/users";

const getUsers = async (): Promise<User[] | null> => {
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

const getUserInfos = async (): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/me`, {
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

export { getUserInfos, getUsers };
