import { useLocation, useNavigate } from "react-router-dom";

interface ParamsToUpdate {
  [key: string]: string | number | null | undefined;
}

export function updateUrlParams(navigate: ReturnType<typeof useNavigate>, location: ReturnType<typeof useLocation>, paramsToUpdate: ParamsToUpdate) {
  const params = new URLSearchParams(location.search);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
  });

  navigate(`${location.pathname}?${params.toString()}`, { replace: true });
}
