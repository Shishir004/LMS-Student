import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: completedData, isSuccess: completedSuccess }] =
    useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: inCompletedData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess) {
      toast.success(completedData?.message);
      refetch();
    }
    if (inCompletedSuccess) {
      toast.success(inCompletedData?.message);
      refetch();
    }
  }, [completedSuccess, inCompletedSuccess]);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading course progress.</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle, lectures } = courseDetails;
  const initialLecture = currentLecture || (lectures?.length && lectures[0]);

  const isLectureCompleted = (lectureId) =>
    progress?.some((prog) => prog.lectureId === lectureId && prog.viewed);

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {courseTitle}
        </h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          className={`rounded-full ${
            completed ? "text-green-600 border-green-500" : "bg-purple-700 text-white"
          }`}
        >
          {completed ? (
            <span className="flex items-center gap-2">
              <CheckCircle size={18} /> Completed
            </span>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Player Section */}
        <div className="md:w-2/3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg">
          <video
            src={currentLecture?.videoUrl || initialLecture.videoUrl}
            controls
            className="w-full rounded-lg mb-4"
            onPlay={() =>
              handleLectureProgress(currentLecture?._id || initialLecture._id)
            }
          />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {`Lecture ${
              lectures.findIndex(
                (lec) =>
                  lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1
            }: ${currentLecture?.lectureTitle || initialLecture.lectureTitle}`}
          </h2>
        </div>

        {/* Lecture Sidebar */}
        <div className="md:w-1/3 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Course Lectures</h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {lectures.map((lecture) => {
              const isCurrent = lecture._id === currentLecture?._id;
              return (
                <Card
                  key={lecture._id}
                  onClick={() => handleSelectLecture(lecture)}
                  className={`cursor-pointer transition hover:shadow-lg ${
                    isCurrent ? "bg-purple-100 dark:bg-purple-900" : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <CardContent className="flex items-center justify-between py-4 px-3">
                    <div className="flex items-center gap-3">
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle2 size={20} className="text-green-600" />
                      ) : (
                        <CirclePlay size={20} className="text-gray-500" />
                      )}
                      <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-200">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                    {isLectureCompleted(lecture._id) && (
                      <Badge className="bg-green-100 text-green-600 border border-green-300">
                        Done
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
