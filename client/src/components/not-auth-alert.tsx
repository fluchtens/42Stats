"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export const NotAuthAlert = () => (
  <Alert variant="destructive">
    <ExclamationTriangleIcon className="h-4 w-4" />
    <AlertTitle>Not authenticated</AlertTitle>
    <AlertDescription>
      <p>You need to be authenticated to access this page.</p>
      <p>Please log in with your 42 account.</p>
    </AlertDescription>
  </Alert>
);
