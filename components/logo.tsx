"use client";

import Image from "next/image";

const Logo = () => {
  return (
    <Image
      alt="Simplex LMS Logo"
      width={120}
      height={120}
      src="/images/simplex.svg"
      priority
      className="rounded-full bg-primary-foreground dark:bg-transparent p-2"
    />
  );
};

export default Logo;
