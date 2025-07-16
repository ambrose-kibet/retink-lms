"use server";

import { redirect } from "next/navigation";
import {
  enrollInCourse,
  addLessonToCourse,
  getMyMyCourseDetails,
} from "@/data/enrollments";
import { getCurrentUser } from "./auth";
import { getCourseById } from "@/data/course";

export const enrollUserInCourse = async (courseId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      redirect("/auth");
    }
    const result = await enrollInCourse(user.id, courseId);
    if (result?.status === "success") {
      redirect(`/courses/${courseId}`);
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error enrolling in course:", error);
    return { status: "error", error: error.message || "An error occurred" };
  }
};

export const myCourseDetails = async (courseId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      redirect("/auth");
    }
    const userId = user.id;
    const courseDetails = await getMyMyCourseDetails(userId, courseId);
    const course = await getCourseById(courseId);

    if (!courseDetails || !course) {
      return null;
    }

    const lessonsCount = courseDetails?.course.lessons.length || 0;
    const completedLessonsCount = courseDetails?.lessonProgress.length || 0;
    const progress =
      lessonsCount > 0 ? (completedLessonsCount / lessonsCount) * 100 : 0;
    const lessonsWithCompleteStatus = courseDetails?.course.lessons.map(
      (lesson) => {
        const lessonProgress = courseDetails?.lessonProgress.find(
          (lp) => lp.lessonId === lesson.id
        );
        return {
          ...lesson,
          completed: lessonProgress?.completed || false,
        };
      }
    );
    return {
      course,
      progress,
      lessons: lessonsWithCompleteStatus || [],
    };
  } catch (error: any) {
    console.error("Error fetching course details:", error);
    return null;
  }
};
