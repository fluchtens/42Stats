import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

export const LoginBtn = () => {
  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/42/login`;
  };

  return (
    <Button variant="default" size="default" onClick={handleLogin} className="ml-1.5">
      Sign in
    </Button>
  );
};
