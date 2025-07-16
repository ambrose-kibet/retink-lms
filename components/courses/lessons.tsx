import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaEye, FaTrash } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SingleLesson: React.FC<{
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  date: string;
  youtubeUrl: string;
  setCurrentLesson: (lessonId: string) => void;
}> = ({
  id,
  title,
  description,
  isCompleted,
  date,
  youtubeUrl,
  setCurrentLesson,
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {},
  });
  const markComplete = () => {
    mutate();
  };

  return (
    <div
      className="cursor-pointer"
      onClick={() => setCurrentLesson(youtubeUrl)}
    >
      <Card className="w-full">
        <CardHeader className="relative w-full">
          <h3 className="text-bold text-center text-lg capitalize">{title}</h3>
        </CardHeader>
        <CardContent className="gap-y-6 font-mono">
          <p className="text-normal">{description}</p>
          <div className="flex w-full items-center justify-start gap-x-4 shadow-sm">
            <p className="text-sm font-medium"> Lesson Completed</p>
            <Badge variant={isCompleted ? "default" : "destructive"}>
              {isCompleted ? "Yes" : "No"}
            </Badge>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-evenly">
            <Button
              variant={"ghost"}
              className="text-primary"
              onClick={() => markComplete()}
            >
              <FaTrash size={20} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default SingleLesson;
