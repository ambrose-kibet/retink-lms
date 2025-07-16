"use client";
import LessonList from "@/components/courses/lesson-list";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { myCourseDetails } from "@/actions/enroll";
import VideoPlayer from "./video-player";
import { log } from "console";
const CourseDetails: React.FC = () => {
  const params = useParams<{ id: string }>();
  const courseId = params.id;
  const [currentLesson, setCurrentLesson] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-courses", courseId],
    queryFn: () => myCourseDetails(courseId),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.lessons.length) {
      setCurrentLesson(data?.lessons[0].youtubeUrl);
    }
  }, [data]);

  useEffect(() => {
    console.log(currentLesson, "currentLesson in CourseDetails");
  }, [currentLesson]);

  const handleLessonChange = (lessonId: string) => {
    setCurrentLesson(lessonId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading course details.</div>;
  console.log(data?.course?.course?.title, "course title");

  return (
    <div className="max-w-screen-xl  min-h-[calc(100vh-11.5rem)]  mx-auto flex flex-col px-2 pb-4">
      <h1 className="text-3xl font-bold text-center py-3">
        <span className="text-primary">{data?.course?.course?.title}</span>
      </h1>
      <h3 className="text-lg text-muted-foreground text-center mb-4">
        <span className="text-primary">Course Progress: </span> {data?.progress}
        %
      </h3>
      <VideoPlayer videoId={currentLesson} />
      <LessonList
        lessons={data?.lessons || []}
        currentLesson={currentLesson}
        setCurrentLesson={handleLessonChange}
      />
    </div>
  );
};
export default CourseDetails;
