"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className=" w-full flex h-screen flex-col items-center justify-center gap-8 m-auto">
            <h1 className="text-2xl text-center">Something went wrong!</h1>
            <Button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-md mt-4"
              variant={"outline"}
            >
              Try again
            </Button>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
