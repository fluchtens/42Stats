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

async function getCampusUsers(id: number, page: number, pageSize: number): Promise<User[] | null> {
  try {
    const response = await fetch(`${API_URL}/campus/${id}?page=${page}&pageSize=${pageSize}`, {
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

async function getCampusPoolUsers(id: number, month: string, year: string, page: number, pageSize: number): Promise<User[] | null> {
  try {
    const response = await fetch(`${API_URL}/campus/${id}?poolMonth=${month}&poolYear=${year}&page=${page}&pageSize=${pageSize}`, {
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

async function getCampusPoolUsersCount(id: number, month: string, year: string): Promise<number | null> {
  try {
    const response = await fetch(`${API_URL}/campus/${id}/count?poolMonth=${month}&poolYear=${year}`, {
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

export { getCampusPoolUsers, getCampusPoolUsersCount, getCampusUsers, getUserInfos, getUsers };
