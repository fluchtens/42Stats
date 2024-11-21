import { Button } from "@/components/ui/button";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const LoginBtn = () => {
  const handleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/42`;
  };

  return (
    <Button variant="default" size="default" onClick={handleLogin}>
      Sign in
    </Button>
  );
};
