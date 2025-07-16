import { myCourseDetails } from "@/actions/enroll";
import CourseDetails from "@/components/courses/course-details";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
const CourseDetailsPage: React.FC<{ params: { id: string } }> = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id: courseId } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["my-courses", courseId],
    queryFn: () => myCourseDetails(courseId),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CourseDetails />
      </HydrationBoundary>
    </div>
  );
};
export default CourseDetailsPage;
