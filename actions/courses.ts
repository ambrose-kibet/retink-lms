"use server";

import { getAllCourses, createCourse } from "@/data/course";

export const getCourses = async () => {
  try {
    const courses = await getAllCourses();
    if (!courses) {
      throw new Error("No courses found");
    }
    return { status: "success", courses: courses.courses || [] };
  } catch (error: any) {
    console.error("Error fetching courses:", error);
    return { status: "error", error: error.message || "An error occurred" };
  }
};

export const saveCourse = async () => {
  try {
    const course = await createCourse({
      title: "German for beginners ",
      description:
        "LearnGermanOriginal #LearnGerman #germanlevela1 Check out our FREE A1 Course here - A1 - https://goo.gl/YuxM9T Learn ...",
      thumbnail: "https://i.ytimg.com/vi/RuGmc662HDg/hqdefault.jpg",
    });
    if (!course) {
      throw new Error("Failed to create course");
    }
    return { status: "success", course: course.course };
  } catch (error: any) {
    console.error("Error creating course:", error);
    return { status: "error", error: error.message || "An error occurred" };
  }
};
