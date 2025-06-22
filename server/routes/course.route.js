import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.post("/",isAuthenticated,createCourse);
router.get("/search",isAuthenticated, searchCourse);
router.get("/published-courses", getPublishedCourse);
router.get("/",isAuthenticated,getCreatorCourses);
router.put("/:courseId",isAuthenticated,upload.single("courseThumbnail"),editCourse);
router.get("/:courseId",isAuthenticated, getCourseById);
router.post("/:courseId/lecture",isAuthenticated, createLecture);
router.get("/:courseId/lecture",isAuthenticated, getCourseLecture);
router.post("/:courseId/lecture  /:lectureId",isAuthenticated, editLecture);
router.delete("/lecture/:lectureId",isAuthenticated, removeLecture);
router.get("/lecture/:lectureId",isAuthenticated, getLectureById);
router.patch("/:courseId",isAuthenticated, togglePublishCourse);


export default router;