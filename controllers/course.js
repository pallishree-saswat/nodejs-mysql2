const db = require("../models/db");
//Get all courses
const getCourses = async (req, res) => {
  const sql = "SELECT * FROM `Course`  ";
  try {
    const results = await db.query(sql);
    return res.json(results[0]);
  } catch (error) {
    console.log(error);
    if (error) {
      res.status(500).json(error);
    }
  }
};

//Get Courses on Filter By queries like name, level and country
const getCoursesByQueries = async (req, res) => {
  //get query parameters from request.query
  const { name, level, country } = req.query;
  //take a variable called sql for storing query
  let sql;

  //If no query param is available make return all the courses
  if (!name || !level || !country) {
    sql =
      "SELECT *,University.university_name,  EducationLevel.level_name, Country.country_name    FROM `Course` INNER JOIN  `University` ON Course.university_id = University.university_id INNER JOIN `EducationLevel` ON EducationLevel.level_id = Course.level_id INNER JOIN `Country`  ON Country.country_id =University.country_id  ";
  }

  //if name , level and country are present
  if (name && level && country) {
    sql =
      'SELECT Course.course_id, Course.course_name, Course.university_id,Course.level_id, Course.annual_tuition, University.university_name, University.university_id ,EducationLevel.level_id, EducationLevel.level_name, Country.country_name FROM `Course`   INNER JOIN `University`  ON University.university_id = Course.university_id AND(Course.course_name LIKE "' +
      name +
      "%" +
      '" OR University.university_name LIKE "' +
      name +
      "%" +
      '") INNER JOIN `EducationLevel`  ON EducationLevel.level_id = Course.level_id INNER JOIN `Country` ON Country.country_id = University.country_id WHERE EducationLevel.level_name="' +
      level +
      '" AND Country.country_name = "' +
      country +
      '"';
  }
  //if level and country are present
  else if (level && country && !name) {
    sql =
      'SELECT Course.course_id, Course.course_name, Course.university_id,Course.level_id, Course.annual_tuition, University.university_name, University.university_id , EducationLevel.level_name, Country.country_name FROM `Course` INNER JOIN `University` ON University.university_id = Course.university_id INNER JOIN `EducationLevel` ON EducationLevel.level_id = Course.level_id INNER JOIN `Country` ON Country.country_id = University.country_id WHERE EducationLevel.level_name="' +
      level +
      '" AND Country.country_name = "' +
      country +
      '"';
  }
  //if level and name are present
  else if (level && name && !country) {
    sql =
      'SELECT Course.course_id, Course.course_name, Course.university_id, Course.level_id, Course.annual_tuition, University.university_name, University.university_id ,EducationLevel.level_id, EducationLevel.level_name, Country.country_name FROM `Course` INNER JOIN `University` ON University.university_id = Course.university_id AND(Course.course_name LIKE "' +
      name +
      "%" +
      '" OR University.university_name LIKE "' +
      name +
      "%" +
      '") INNER JOIN `EducationLevel` ON EducationLevel.level_id = Course.level_id INNER JOIN `Country` ON Country.country_id = University.country_id WHERE EducationLevel.level_name="' +
      level +
      '"';
  }
  //if country and name are present
  else if (name && country && !level) {
    sql =
      'SELECT Course.course_id, Course.course_name, Course.university_id,Course.level_id, Course.annual_tuition, University.university_name, University.university_id ,EducationLevel.level_id, EducationLevel.level_name, Country.country_name FROM `Course` INNER JOIN `University` ON University.university_id = Course.university_id AND(Course.course_name LIKE "' +
      name +
      "%" +
      '" OR University.university_name LIKE "' +
      name +
      "%" +
      '") INNER JOIN `EducationLevel` ON EducationLevel.level_id = Course.level_id INNER JOIN `Country` ON Country.country_id = University.country_id WHERE  Country.country_name = "' +
      country +
      '"';
  }
  //if  name is only present
  else if (name) {
    sql =
      'SELECT Course.course_id, Course.course_name, Course.university_id, Course.annual_tuition,University.university_name FROM `Course` JOIN `University` ON University.university_id = Course.university_id WHERE Course.course_name LIKE"' +
      name +
      "%" +
      '" OR University.university_name LIKE "' +
      name +
      "%" +
      '"';
  }
  //if  level is only present
  else if (level) {
    sql =
      "SELECT Course.course_id, Course.course_name, Course.level_id,Course.annual_tuition, EducationLevel.level_name FROM `Course` INNER JOIN EducationLevel ON EducationLevel.level_id = Course.level_id WHERE EducationLevel.level_name= '" +
      level +
      "'";
  }
  //if  country  is only present
  else if (country) {
    sql =
      "SELECT Course.course_id, Course.course_name , University.country_id ,Course.annual_tuition,University.university_name,University.university_id , Country.country_id, Country.country_name FROM `Course` JOIN `University` ON University.university_id = Course.university_id JOIN `Country` on Country.country_id = University.country_id WHERE Country.country_name='" +
      country +
      "'";
  }

  try {
    //get results from database
    const results = await db.query(sql);
    return res.json({
      data: results[0],
      rowsCount: results[0].length,
      message: "success",
    });
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(500).json({
        data: null,
        error: error,
        message: "Error",
      });
    }
  }
};

module.exports = {
  getCourses,
  getCoursesByQueries,
};
