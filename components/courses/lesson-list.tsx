"use client";
import { useQuery } from "@tanstack/react-query";
import SingleLesson from "./lessons";
import { log } from "console";

const LessonList = ({
  currentLesson,
  setCurrentLesson,
  lessons,
}: {
  lessons: Array<{
    completed: boolean;
    id: string;
    title: string;
    createdAt: Date;
    content: string;
    youtubeUrl: string;
  }>;
  currentLesson: string;
  setCurrentLesson: (lessonId: string) => void;
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-1 pb-4">
      {lessons.map((lesson) => {
        const { id, title, content, youtubeUrl, createdAt } = lesson;
        const isCompleted = lesson.completed;
        return (
          <SingleLesson
            key={id}
            id={id}
            title={title}
            description={content}
            isCompleted={isCompleted}
            date={createdAt.toString()}
            setCurrentLesson={setCurrentLesson}
            youtubeUrl={youtubeUrl}
          />
        );
      })}
    </div>
  );
};
export default LessonList;
