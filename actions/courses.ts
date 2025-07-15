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
