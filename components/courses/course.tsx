"use client";

import { getCourses } from "@/actions/courses";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "./loading-skeleton";
import Image from "next/image";
import EnrollButton from "./enroll-component";

const Home: React.FC = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  });

  if (isPending)
    return (
      <div className="max-w-screen-xl  min-h-[calc(100vh-11.5rem)]  mx-auto flex flex-col px-2 pb-4">
        <h1 className="text-3xl font-bold text-center py-3">
          <span className="text-primary">Courses</span>
        </h1>
        <LoadingSkeleton />
      </div>
    );
  return (
    <div className="max-w-screen-xl  min-h-[calc(100vh-11.5rem)]  mx-auto flex flex-col px-2 pb-4">
      <h1 className="text-3xl font-bold text-center py-3">
        <span className="text-primary">Courses</span>
      </h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-1 pb-4">
        {data?.courses && data.courses.length === 0 && !isError ? (
          <p className="text-center">No courses found</p>
        ) : (
          (data?.courses || []).map((course) => {
            const { id, title, description, thumbnail } = course;
            return (
              <div key={id} className=" shadow-md pb-2 relative">
                <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gradient-to-r from-muted-foreground to-primary-foreground">
                  <Image
                    src={thumbnail || "/no-image.png"}
                    alt={title}
                    fill
                    priority
                    className="w-full  h-full object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="flex px-2">
                  <h2 className="text-primary text-lg font-bold  py-2 px-4 tracking-wider capitalize -translate-y-1/2 bg-background rounded-md border inline-block  text-center">
                    {title}
                  </h2>
                </div>
                <div className="flex items-center justify-between px-2">
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
                <div className="flex items-center justify-between px-2">
                  <EnrollButton courseId={id} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default Home;
