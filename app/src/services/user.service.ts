import { FortyTwoUser } from "@prisma/client";

export async function getUserById(userId: number): Promise<FortyTwoUser | null> {
  try {
    const url = `/api/user?user_id=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCampusUsers(
  campusId: number,
  page: number,
  pageSize: number
): Promise<FortyTwoUser[] | null> {
  try {
    const url = `/api/user/campus?campus_id=${campusId}&page=${page}&page_size=${pageSize}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTotalCampusUsers(campusId: number): Promise<FortyTwoUser[] | null> {
  try {
    const url = `/api/user/total_campus?campus_id=${campusId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPoolUsers(
  campusId: number,
  month: string,
  year: string,
  page: number,
  pageSize: number
): Promise<FortyTwoUser[] | null> {
  try {
    const url = `/api/user/pool?campus_id=${campusId}&pool_month=${month}&pool_year=${year}&page=${page}&page_size=${pageSize}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTotalPoolUsers(
  campusId: number,
  month: string,
  year: string
): Promise<FortyTwoUser[] | null> {
  try {
    const url = `/api/user/total_pool?campus_id=${campusId}&pool_month=${month}&pool_year=${year}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
