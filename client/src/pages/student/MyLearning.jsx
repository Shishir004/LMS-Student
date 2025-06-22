import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import { motion } from "framer-motion";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <motion.div
      className="max-w-5xl mx-auto my-10 px-4 md:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 mb-6">
        My Learning
      </h1>

      {isLoading ? (
        <MyLearningSkeleton />
      ) : myLearning.length === 0 ? (
        <motion.div
          className="text-center text-gray-600 dark:text-gray-300 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          You are not enrolled in any courses yet.
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myLearning.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Course course={course} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyLearning;

// 🧱 Skeleton Loader
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[...Array(3)].map((_, index) => (
      <motion.div
        key={index}
        className="rounded-xl h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      />
    ))}
  </div>
);
