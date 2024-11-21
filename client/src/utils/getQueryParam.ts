export function getQueryParam(search: string, param: string): string | null {
  const params = new URLSearchParams(search);
  return params.get(param);
}
