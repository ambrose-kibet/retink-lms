"use client";
import { getCurrentUser } from "@/actions/auth";
import { useQuery } from "@tanstack/react-query";
export function useCurrentUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });
}
