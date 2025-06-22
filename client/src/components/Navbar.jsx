import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DarkMode from "@/DarkMode";
import { useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 dark:from-gray-900 dark:to-gray-800 text-white shadow-md fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap size={28} className="text-white" />
          <span className="text-white">E-Learnify</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black">
                <DropdownMenuItem>
                  <Link to="/my-learning">My Learning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile">Edit Profile</Link>
                </DropdownMenuItem>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/login")}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" className="text-white border-white" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button className="bg-white text-purple-700 hover:bg-gray-200" onClick={() => navigate("/register")}>
                Signup
              </Button>
            </>
          )}
          <DarkMode />
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <DarkMode />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="text-white border-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white text-black p-4 space-y-4">
              <h2 className="font-bold text-lg">Menu</h2>
              <Link to="/" className="block">Home</Link>
              <Link to="/my-learning" className="block">My Learning</Link>
              <Link to="/profile" className="block">Profile</Link>
              {user?.role === "instructor" && (
                <Link to="/admin/dashboard" className="block">Dashboard</Link>
              )}
              <Button variant="ghost" onClick={() => navigate("/login")}>
                {user ? "Logout" : "Login"}
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
