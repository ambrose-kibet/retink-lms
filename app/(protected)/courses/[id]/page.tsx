import { myCourseDetails } from "@/actions/enroll";
import CourseDetails from "@/components/courses/course-details";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const { id: courseId } = resolvedParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["my-courses", courseId],
    queryFn: () => myCourseDetails(courseId as string),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CourseDetails />
      </HydrationBoundary>
    </div>
  );
}
