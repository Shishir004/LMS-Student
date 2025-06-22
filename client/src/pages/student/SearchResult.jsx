import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="group transition-all duration-300 hover:shadow-xl hover:scale-[1.01] bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 items-start md:items-center"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded-lg shadow-sm"
        />
        <div className="flex flex-col flex-1 justify-between gap-2">
          <h1 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white">
            {course.courseTitle}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {course.subTitle}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Instructor:{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {course.creator?.name}
            </span>
          </p>
          <Badge className="w-fit bg-blue-500 dark:bg-blue-700 text-white text-xs px-2 py-0.5 mt-2">
            {course.courseLevel}
          </Badge>
        </div>
        <div className="md:text-right ml-auto">
          <h1 className="font-bold text-lg md:text-xl text-green-600 dark:text-green-400">
            ₹{course.coursePrice}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
