import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCourses } from "@/actions/courses";
import Courses from "@/components/courses/course";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Courses />
    </HydrationBoundary>
  );
}
