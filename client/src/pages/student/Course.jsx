import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants
const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  whileHover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" },
  transition: { type: "spring", stiffness: 100, damping: 10 },
};

const Course = ({ course }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      variants={cardVariants}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/course-detail/${course._id}`}>
        <Card className="overflow-hidden rounded-2xl bg-white dark:bg-[#1e1e2f] transition-all duration-300">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <img
              src={course.courseThumbnail}
              alt="course thumbnail"
              className="w-full h-44 object-cover"
            />
          </motion.div>
          <CardContent className="p-4 space-y-3">
            <h2 className="text-lg font-semibold truncate text-gray-900 dark:text-white hover:underline">
              {course.courseTitle}
            </h2>

            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                    alt={course.creator?.name || "User"}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {course.creator?.name || "Unknown"}
                </span>
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-0.5 text-xs rounded-full shadow">
                {course.courseLevel}
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-right text-lg font-bold text-indigo-700 dark:text-indigo-300"
            >
              ₹{course.coursePrice}
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default Course;
