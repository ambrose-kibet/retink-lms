import { signout } from "@/actions/auth";
import { getUserFromCookie } from "@/lib/getuser";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
  const user = await getUserFromCookie();

  if (!user?.id) {
    await signout();
    return redirect("/auth");
  }
  return (
    <div className="max-w-screen-xl  min-h-[calc(100vh-11.5rem)]  mx-auto flex flex-col">
      {children}
    </div>
  );
};
export default ProtectedLayout;
