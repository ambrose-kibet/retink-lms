"use client";

import { enrollUserInCourse } from "@/actions/enroll";
import { useCurrentUser } from "@/app/_hooks/use-current-user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const EnrollButton = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => enrollUserInCourse(courseId),
    onSuccess: () => {
      router.push(`/courses/${courseId}`);
    },
  });
  const handleEnroll = () => {
    mutate();
  };
  const navigate = (path: string) => {
    router.push(path);
  };
  const { data: user, isLoading } = useCurrentUser();
  if (isLoading) {
    return (
      <button
        disabled
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
      >
        Loading...
      </button>
    );
  }

  if (!user?.id) {
    return (
      <button
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        onClick={() => navigate("/auth")}
      >
        view course
      </button>
    );
  }

  return (
    <button
      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
      onClick={() => handleEnroll()}
      disabled={isPending}
    >
      Enroll
    </button>
  );
};
export default EnrollButton;
