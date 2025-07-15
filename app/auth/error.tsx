"use client";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className=" w-full flex h-screen flex-col items-center justify-center gap-8 m-auto">
      <h1 className="text-2xl text-center">Something went wrong!</h1>
      {error.digest && <p className="text-center">{error.message}</p>}
      <p className=" text-center">Please try again later.</p>
      <Button
        onClick={() => reset()}
        className="px-4 py-2 rounded-md mt-4"
        variant={"outline"}
      >
        Try again
      </Button>
    </div>
  );
}
