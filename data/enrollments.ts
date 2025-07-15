import db from "@/lib/prisma";

export const getMyEnrollments = async (userId: string) => {
  try {
    const enrollments = await db.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
          },
        },
      },
    });
    return { status: "success", enrollments };
  } catch (error: any) {
    console.error("Error fetching enrolments:", error);
    return null;
  }
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  try {
    const enrollment = await db.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });
    return { status: "success", enrollment };
  } catch (error: any) {
    console.error("Error enrolling in course:", error);
    return null;
  }
};

export const getMyMyCourseDetails = async (
  userId: string,
  courseId: string
) => {
  try {
    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
          },
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                content: true,
                youtubeUrl: true,
                createdAt: true,
              },
              include: {
                lessonProgress: {
                  where: { userId },
                  select: { completed: true },
                },
              },
            },
          },
        },
      },
    });

    return { status: "success", enrollment };
  } catch (error: any) {
    console.error("Error fetching course details:", error);
    return null;
  }
};

export const markLessonAsCompleted = async (
  userId: string,
  courseId: string,
  lessonId: string
) => {
  try {
    const lessonProgress = await db.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId,
        lessonId,
        completed: true,
      },
    });
    return { status: "success", lessonProgress };
  } catch (error: any) {
    console.error("Error marking lesson as completed:", error);
    return null;
  }
};

export const unMarkLessonAsCompleted = async (
  userId: string,
  courseId: string,
  lessonId: string
) => {
  try {
    const lessonProgress = await db.lessonProgress.update({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      data: {
        completed: false,
      },
    });
    return { status: "success", lessonProgress };
  } catch (error: any) {
    console.error("Error unmarking lesson as completed:", error);
    return null;
  }
};

export const checkEnrollment = async (userId: string, courseId: string) => {
  try {
    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    return { status: "success", enrolled: !!enrollment };
  } catch (error: any) {
    console.error("Error checking enrollment:", error);
    return null;
  }
};
