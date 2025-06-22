import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-4 md:p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="my-6 text-center md:text-left">
        <h1 className="font-bold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
          Results for "{query}"
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Showing results for{" "}
          <span className="text-blue-600 dark:text-blue-400 font-semibold italic">
            {query}
          </span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <Filter handleFilterChange={handleFilterChange} />
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <CourseSkeleton />
              </motion.div>
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course, idx) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <SearchResult course={course} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchPage;

// ✨ Empty State
const CourseNotFound = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-3xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Browse All Courses
        </Button>
      </Link>
    </motion.div>
  );
};

// 🔄 Skeleton Loader
const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-4 animate-pulse">
      <div className="h-32 w-full md:w-64 rounded-lg overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-col gap-2 flex-1 px-4 mt-4 md:mt-0">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3 rounded" />
        </div>
        <Skeleton className="h-6 w-20 mt-2 rounded" />
      </div>

      <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
        <Skeleton className="h-6 w-12 rounded" />
      </div>
    </div>
  );
};
