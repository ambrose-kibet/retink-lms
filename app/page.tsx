import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCourses } from "@/actions/courses";
import Courses from "@/components/courses/course";
import { getCurrentUser } from "@/actions/auth";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Courses />
    </HydrationBoundary>
  );
}
