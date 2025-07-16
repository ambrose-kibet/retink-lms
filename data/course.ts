import db from "@/lib/prisma";

export const createCourse = async ({
  title,
  description,
  thumbnail,
}: {
  title: string;
  description: string;
  thumbnail: string;
}) => {
  try {
    const course = await db.course.create({
      data: {
        title,
        description,
        thumbnail,
      },
    });
    return { status: "success", course };
  } catch (error: any) {
    console.error("Error creating course:", error);
    return null;
  }
};

export const getAllCourses = async () => {
  try {
    const courses = await db.course.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        createdAt: true,
      },
      take: 10,
      skip: 0,
      orderBy: {
        createdAt: "desc",
      },
    });
    return { status: "success", courses };
  } catch (error: any) {
    console.error("Error fetching courses:", error);
    return null;
  }
};

export const getCourseById = async (courseId: string) => {
  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        title: true,
      },
    });
    return { course };
  } catch (error: any) {
    console.error("Error fetching course by ID:", error);
    return null;
  }
};
