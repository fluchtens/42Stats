"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

interface ParamsToUpdate {
  [key: string]: string | number | null | undefined;
}

export function updateUrlParams(router: AppRouterInstance, pathname: string, searchParams: ReadonlyURLSearchParams, paramsToUpdate: ParamsToUpdate) {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
  });

  router.push(pathname + "?" + params.toString());
}
