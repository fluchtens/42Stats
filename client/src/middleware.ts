import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { User } from "./types/user.interface";

const getUserInfos = async (token: string): Promise<User | null> => {
  try {
    const response = await fetch(`http://42stats-api:8080/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION=${token}`,
      },
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

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("SESSION");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const user = await getUserInfos(token.value);
  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/leaderboard", "/stats"],
};
