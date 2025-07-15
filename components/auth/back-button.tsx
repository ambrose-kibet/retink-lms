"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const BackButton: React.FC<{
  backButtonLabel: string;
  backButtonHref: string;
}> = ({ backButtonHref, backButtonLabel }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <Button asChild variant={"link"} className="font-normal">
        <Link href={backButtonHref}>{backButtonLabel}</Link>
      </Button>
    </div>
  );
};
export default BackButton;
