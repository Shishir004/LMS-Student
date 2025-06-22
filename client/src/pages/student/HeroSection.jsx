import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155] py-32 px-4 text-center overflow-hidden shadow-inner">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/connected.png')]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative max-w-3xl mx-auto z-10"
      >
        <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-md">
          Unlock Your Future with Expert-Led Courses
        </h1>
        <p className="text-white/80 dark:text-gray-300 text-lg mb-8 font-light">
          Learn anything, anytime – from development to design and everything in between.
        </p>

        <form
          onSubmit={searchHandler}
          className="flex flex-col sm:flex-row items-center bg-white/90 dark:bg-gray-800 border border-white/20 dark:border-gray-700 rounded-full shadow-xl overflow-hidden max-w-xl mx-auto backdrop-blur-sm"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses like React, Python, UI/UX..."
            className="flex-grow px-6 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-none focus-visible:ring-0"
          />
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-none rounded-r-full font-medium transition"
          >
            Search
          </Button>
        </form>

        <div className="mt-6">
          <Button
            onClick={() => navigate(`/course/search?query=`)}
            variant="outline"
            className="rounded-full px-6 py-3 text-white border-white hover:bg-white hover:text-indigo-600 dark:hover:text-indigo-500 transition"
          >
            🌟 Explore All Courses
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
