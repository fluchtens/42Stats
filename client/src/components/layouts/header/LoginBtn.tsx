import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const LoginBtn = () => {
  const handleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/42`;
  };

  return (
    <Button variant="default" size="default" onClick={handleLogin} className="ml-1.5">
      Sign in
    </Button>
  );
};
