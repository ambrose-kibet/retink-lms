"use client";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: React.FC = () => {
  const items = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-1 pb-4">
      {items.map((item) => (
        <div key={item} className="flex flex-col rounded-lg shadow-md pb-2">
          <div className="flex items-center justify-between w-full h-56 md:h-64 ">
            <Skeleton className="w-full h-56 md:h-64" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
