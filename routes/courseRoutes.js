const express = require("express")
const router = express.Router()
const { getCourses,getCoursesByQueries} = require("../controllers/course")

//api routes for course
router.get('/allCourses',getCourses )
router.get('/course',getCoursesByQueries )

module.exports = router;