const express = require("express");
const router = express.Router();

const swaggerUI = require("swagger-ui-express"),
  swaggerCourse = require("./swagger_course.json");

router.get("/", (req, res) => {
  res.sendFile("./swagger.html", { root: __dirname });
});

router.use(
  "/course",
  swaggerUI.serveFiles(swaggerCourse),
  swaggerUI.setup(swaggerCourse)
);

module.exports = router;
