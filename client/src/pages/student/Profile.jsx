import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    { data: updateUserData, isLoading: updateUserIsLoading, isError, error, isSuccess },
  ] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  if (isLoading) return <h1 className="text-center text-lg">Loading profile...</h1>;

  const user = data?.user;

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Your Profile
      </h1>

      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-28 w-28 md:h-36 md:w-36 ring-4 ring-indigo-500">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="User Avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex-1 space-y-2 text-gray-800 dark:text-gray-100">
          <p>
            <strong>Name:</strong>{" "}
            <span className="text-gray-600 dark:text-gray-300">{user.name}</span>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <span className="text-gray-600 dark:text-gray-300">{user.email}</span>
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <span className="text-indigo-600 font-semibold">{user.role?.toUpperCase()}</span>
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Courses You're Enrolled In</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {user.enrolledCourses?.length === 0 ? (
            <p className="text-center text-gray-600">You haven't enrolled in any courses yet.</p>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
