"use server";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="p-6 flex-1">
      <div className="m-auto mt-6 max-w-screen-xl flex flex-col justify-center items-center text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-lg font-light text-muted-foreground">{"Oops! The page you're looking for doesn't exist."}</p>
        <Button variant="default" className="mt-3" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
