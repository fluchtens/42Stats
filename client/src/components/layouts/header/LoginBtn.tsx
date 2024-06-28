import { Button } from "@/components/ui/button";

const API_URL = "http://localhost:8080";

export const LoginBtn = () => {
  const handleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/42`;
  };

  return (
    <Button variant="ghost" size="default" onClick={handleLogin}>
      Sign in
    </Button>
  );
};
