import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="mb-2 text-6xl font-bold">404</h1>
      <p className="mb-2 text-2xl font-semibold">Page Not Found</p>
      <p className="mb-4 text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button variant="default">Back to home</Button>
      </Link>
    </main>
  );
}
